/* eslint-disable import/no-anonymous-default-export */
import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { collections, dbConnect, throwError } from '@backend/utils'
import queryTopScores from '@backend/queries/topScores'
import { COUNTRY_STREAKS_ID, DAILY_CHALLENGE_ID } from '@utils/constants/random'
import queryTopStreaks from '@backend/queries/topStreaks'
import { Game } from '@backend/models'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== 'POST') {
      return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    const authHeader = req.headers.authorization

    if (!authHeader || authHeader !== process.env.INTERNAL_API_SECRET) {
      return throwError(res, 401, 'Unauthorized')
    }

    await dbConnect()

    const { game } = req.body

    if (game.mode === 'standard' && !game.isDailyChallenge) {
      await updateMapLeaderboard(game)
      await updateMapStats(game)
    }

    if (game.mode === 'standard' && game.isDailyChallenge) {
      await updateDailyChallenge(game)
    }

    if (game.mode === 'streak') {
      await updateStreakLeaderboard(game)
      await updateStreakStats()
    }

    res.status(200).send('Success')
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false })
  }
}

// DAILY CHALLENGE
const updateDailyChallenge = async (game: Game) => {
  const dailyChallengeQuery = await collections.challenges
    ?.find({ isDailyChallenge: true })
    .sort({ createdAt: -1 })
    .limit(1)
    .toArray()

  if (!dailyChallengeQuery?.length) {
    return null
  }

  const dailyChallenge = dailyChallengeQuery[0]
  const dailyChallengeId = new ObjectId(dailyChallenge._id)

  const stats = await getDailyChallengeStats(dailyChallengeId)
  const scores = await getDailyChallengeScores(dailyChallengeId, game)

  let updateFields = {}

  if (stats) {
    updateFields = { ...updateFields, ...stats }
  }

  if (scores) {
    updateFields = { ...updateFields, scores }
  }

  await collections.mapLeaderboard?.findOneAndUpdate(
    { mapId: DAILY_CHALLENGE_ID, dailyChallengeId },
    { $set: updateFields },
    { upsert: true }
  )
}

const getDailyChallengeStats = async (dailyChallengeId: ObjectId) => {
  const gameStats = await collections.games
    ?.aggregate([
      { $match: { challengeId: dailyChallengeId, state: 'finished', notForLeaderboard: { $ne: true } } },
      {
        $group: {
          _id: null,
          avgScore: { $avg: '$totalPoints' },
          uniquePlayers: { $addToSet: '$userId' },
        },
      },
      {
        $project: {
          _id: 0,
          avgScore: 1,
          explorers: { $size: '$uniquePlayers' },
        },
      },
    ])
    .toArray()

  if (!gameStats) {
    return null
  }

  const { explorers, avgScore } = gameStats?.length ? gameStats[0] : { explorers: 0, avgScore: 0 }

  return {
    usersPlayed: explorers,
    avgScore: Math.ceil(avgScore),
  }
}

const getDailyChallengeScores = async (dailyChallengeId: ObjectId, game: Game) => {
  const mapId = DAILY_CHALLENGE_ID
  const mapLeaderboard = await collections.mapLeaderboard?.findOne({ mapId, dailyChallengeId })

  const topScores = mapLeaderboard?.scores
  const lowestTopScore = topScores?.length
    ? topScores.reduce((min, score) => Math.min(min, score.totalPoints), Infinity)
    : 0

  if (game.totalPoints < lowestTopScore) {
    return
  }

  const query = { challengeId: dailyChallengeId, state: 'finished' }
  const newTopScores = await queryTopScores(query, 5)

  return newTopScores
}

// REGULAR MAPS
const updateMapStats = async (game: Game) => {
  const mapId = new ObjectId(game.mapId)

  const gameStats = await collections.games
    ?.aggregate([
      { $match: { mapId, state: 'finished', notForLeaderboard: { $ne: true } } },
      {
        $group: {
          _id: null,
          avgScore: { $avg: '$totalPoints' },
          uniquePlayers: { $addToSet: '$userId' },
        },
      },
      {
        $project: {
          _id: 0,
          avgScore: 1,
          explorers: { $size: '$uniquePlayers' },
        },
      },
    ])
    .toArray()

  if (!gameStats) {
    return null
  }

  const { explorers, avgScore } = gameStats?.length ? gameStats[0] : { explorers: 0, avgScore: 0 }
  const roundedAvgScore = Math.ceil(avgScore)

  await collections.maps?.updateOne({ _id: mapId }, { $set: { avgScore: roundedAvgScore, usersPlayed: explorers } })
}

const updateMapLeaderboard = async (game: Game) => {
  const mapId = new ObjectId(game.mapId)
  const mapLeaderboard = await collections.mapLeaderboard?.findOne({ mapId })

  const topScores = mapLeaderboard?.scores
  const lowestTopScore = topScores?.length
    ? topScores.reduce((min, score) => Math.min(min, score.totalPoints), Infinity)
    : 0

  if (game.totalPoints >= lowestTopScore) {
    const query = { mapId, round: 6 }
    const newTopScores = await queryTopScores(query, 5)

    await collections.mapLeaderboard?.findOneAndUpdate({ mapId }, { $set: { scores: newTopScores } }, { upsert: true })
  }
}

// COUNTRY STREAKS
const updateStreakStats = async () => {
  const gameStats = await collections.games
    ?.aggregate([
      { $match: { mode: 'streak', state: 'finished', notForLeaderboard: { $ne: true } } },
      {
        $group: {
          _id: null,
          avgScore: { $avg: '$streak' },
          uniquePlayers: { $addToSet: '$userId' },
        },
      },
      {
        $project: {
          _id: 0,
          avgScore: 1,
          explorers: { $size: '$uniquePlayers' },
        },
      },
    ])
    .toArray()

  if (!gameStats) {
    return null
  }

  const { explorers, avgScore } = gameStats?.length ? gameStats[0] : { explorers: 0, avgScore: 0 }
  const roundedAvgScore = Math.ceil(avgScore)

  await collections.mapLeaderboard?.findOneAndUpdate(
    { mapId: COUNTRY_STREAKS_ID },
    { $set: { avgScore: roundedAvgScore, usersPlayed: explorers } },
    { upsert: true }
  )
}

const updateStreakLeaderboard = async (game: Game) => {
  const mapId = COUNTRY_STREAKS_ID
  const mapLeaderboard = await collections.mapLeaderboard?.findOne({ mapId })

  const topScores = mapLeaderboard?.scores
  const lowestTopScore = topScores?.length
    ? topScores.reduce((min, score) => Math.min(min, score.totalPoints), Infinity)
    : 0

  if (game.streak >= lowestTopScore) {
    const query = { mode: 'streak', state: 'finished' }
    const newTopScores = await queryTopStreaks(query, 5)

    await collections.mapLeaderboard?.findOneAndUpdate({ mapId }, { $set: { scores: newTopScores } }, { upsert: true })
  }
}
