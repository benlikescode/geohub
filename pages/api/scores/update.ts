/* eslint-disable import/no-anonymous-default-export */
import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { collections, dbConnect } from '@backend/utils'
import queryTopScores from '@backend/queries/topScores'
import { COUNTRY_STREAKS_ID, DAILY_CHALLENGE_ID } from '@utils/constants/random'
import queryTopStreaks from '@backend/queries/topStreaks'
import { Game } from '@backend/models'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    if (req.method !== 'POST') {
      return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    const { game } = req.body

    if (game.mode === 'standard' && !game.isDailyChallenge) {
      updateMapStats(game)
      updateMapLeaderboard(game)
    }

    if (game.mode === 'standard' && game.isDailyChallenge) {
      updateDailyChallengeStats()
      updateDailyChallengeLeaderboard(game)
    }

    if (game.mode === 'streak') {
      updateStreakStats()
      updateStreakLeaderboard(game)
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false })
  }
}

const updateDailyChallengeStats = async () => {
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

  const gameStats = await collections.games
    ?.aggregate([
      { $match: { challengeId: dailyChallengeId, state: 'finished' } },
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

  await collections.mapLeaderboard?.findOneAndUpdate(
    { mapId: DAILY_CHALLENGE_ID, dailyChallengeId },
    { $set: { avgScore: roundedAvgScore, usersPlayed: explorers } },
    { upsert: true }
  )
}

const updateMapStats = async (game: Game) => {
  const mapId = new ObjectId(game.mapId)

  const gameStats = await collections.games
    ?.aggregate([
      { $match: { mapId, state: 'finished' } },
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

const updateStreakStats = async () => {
  const gameStats = await collections.games
    ?.aggregate([
      { $match: { mode: 'streak', state: 'finished' } },
      {
        $group: {
          _id: null,
          avgStreak: { $avg: '$streak' },
          uniquePlayers: { $addToSet: '$userId' },
        },
      },
      {
        $project: {
          _id: 0,
          avgStreak: 1,
          explorers: { $size: '$uniquePlayers' },
        },
      },
    ])
    .toArray()

  if (!gameStats) {
    return null
  }

  const { explorers, avgStreak } = gameStats?.length ? gameStats[0] : { explorers: 0, avgStreak: 0 }
  const roundedAvgStreak = Math.ceil(avgStreak)

  await collections.mapLeaderboard?.findOneAndUpdate(
    { mapId: COUNTRY_STREAKS_ID },
    { $set: { avgStreak: roundedAvgStreak, usersPlayed: explorers } },
    { upsert: true }
  )
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

const updateDailyChallengeLeaderboard = async (game: Game) => {
  const mapId = DAILY_CHALLENGE_ID
  const mapLeaderboard = await collections.mapLeaderboard?.findOne({ mapId })

  const topScores = mapLeaderboard?.scores
  const lowestTopScore = topScores?.length
    ? topScores.reduce((min, score) => Math.min(min, score.totalPoints), Infinity)
    : 0

  if (game.totalPoints >= lowestTopScore) {
    const query = { challengeId: game.challengeId, state: 'finished' }
    const newTopScores = await queryTopScores(query, 5)

    await collections.mapLeaderboard?.findOneAndUpdate({ mapId }, { $set: { scores: newTopScores } }, { upsert: true })
  }
}
