import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { Game } from '@backend/models'
import getMapFromGame from '@backend/queries/getMapFromGame'
import {
  calculateDistance,
  calculateRoundScore,
  collections,
  getLocations,
  getUserId,
  throwError,
} from '@backend/utils'
import { ChallengeType, DistanceType, GuessType } from '@types'
import queryTopScores from '@backend/queries/topScores'
import { COUNTRY_STREAKS_ID } from '@utils/constants/random'
import queryTopStreaks from '@backend/queries/topStreaks'

const updateGame = async (req: NextApiRequest, res: NextApiResponse) => {
  const gameId = req.query.id as string
  const userId = await getUserId(req, res)

  const getGameQuery = { _id: new ObjectId(gameId) }
  const { guess, guessTime, localRound, timedOut, timedOutWithGuess, adjustedLocation, streakLocationCode } = req.body

  const game = (await collections.games?.findOne(getGameQuery)) as Game

  if (!game) {
    return throwError(res, 500, 'Failed to save your recent guess')
  }

  // Verify this is the game creator
  if (userId !== game.userId.toString()) {
    return throwError(res, 401, 'You are not authorized to modify this game')
  }

  // Checking if guess has already been submitted for this round
  if (game.guesses.length === localRound) {
    return throwError(res, 400, 'You have already made a guess for this round. Please refresh your browser')
  }

  // Determine if game is finished
  let isGameFinished = false

  if (game.mode === 'standard') {
    isGameFinished = game.round === 5
  }

  if (game.mode === 'streak') {
    const actualLocation = game.rounds[localRound - 1]

    if (streakLocationCode.toLowerCase() !== actualLocation.countryCode?.toLowerCase()) {
      isGameFinished = true
    } else {
      game.streak++
    }
  }

  game.state = isGameFinished ? 'finished' : 'started'

  // Check if streak games need more locations
  if (!isGameFinished) {
    const isStreakGame = game.mode === 'streak'
    const NEW_LOCATIONS_COUNT = 10

    // Standard 5 round games get created with 5 locations -> Streak games may require more locations
    if (isStreakGame && game.challengeId) {
      const query = { _id: new ObjectId(game.challengeId) }
      const challenge = (await collections.challenges?.findOne(query)) as ChallengeType

      if (localRound >= challenge.locations.length) {
        const newLocations = await getLocations(game.mapId, NEW_LOCATIONS_COUNT)

        if (!newLocations) {
          return throwError(res, 400, 'Failed to get new location')
        }

        challenge.locations = challenge.locations.concat(newLocations)

        const updatedChallenge = await collections.challenges?.findOneAndUpdate(query, { $set: challenge })

        if (!updatedChallenge) {
          return throwError(res, 500, 'Failed to get next round')
        }

        game.rounds = game.rounds.concat(newLocations)
      }

      // Every round, sync the user's game rounds with the challenge locations
      game.rounds = challenge.locations
    }

    if (isStreakGame && !game.challengeId) {
      if (localRound >= game.rounds.length) {
        const newLocations = await getLocations(game.mapId, NEW_LOCATIONS_COUNT)

        if (!newLocations) {
          return throwError(res, 400, 'Failed to get new location')
        }

        game.rounds = game.rounds.concat(newLocations)
      }
    }

    // Updates the previously generated round to the coordinates returned by the Google SV Pano
    if (adjustedLocation) {
      game.rounds[localRound - 1] = adjustedLocation
    }
  }

  // Calculate distance and points for this guess
  const mapDetails = await getMapFromGame(game)

  const metricDistance = calculateDistance(guess, game.rounds[game.round - 1], 'metric')
  const imperialDistance = calculateDistance(guess, game.rounds[game.round - 1], 'imperial')

  const distance: DistanceType = {
    metric: metricDistance,
    imperial: imperialDistance,
  }

  const points = calculateRoundScore(metricDistance, mapDetails?.scoreFactor)

  // Add this guess to guesses array
  const newGuess: GuessType = {
    lat: guess.lat,
    lng: guess.lng,
    points: timedOut && !timedOutWithGuess ? 0 : points,
    distance,
    time: Math.floor(guessTime),
    timedOut,
    timedOutWithGuess,
    streakLocationCode,
  }
  game.guesses = game.guesses.concat(newGuess)

  // Update game
  game.round++
  game.totalPoints += timedOut && !timedOutWithGuess ? 0 : points
  game.totalDistance.metric += distance.metric
  game.totalDistance.imperial += distance.imperial
  game.totalTime += Math.floor(guessTime)

  const updatedGame = await collections.games?.findOneAndUpdate(getGameQuery, { $set: game })

  if (!updatedGame) {
    return throwError(res, 500, 'Failed to save your recent guess')
  }

  res.status(200).send({ game, mapDetails })

  // In the background, update map stats and top scores
  if (isGameFinished && game.mode === 'standard') {
    await updateMapStats(game)
    await updateMapLeaderboard(game)
  }

  if (isGameFinished && game.mode === 'streak') {
    await updateStreakStats()
    await updateStreakLeaderboard(game)
  }
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

  await collections.maps?.updateOne(
    { _id: COUNTRY_STREAKS_ID },
    { $set: { avgStreak: roundedAvgStreak, usersPlayed: explorers } }
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
  const mapLeaderboard = await collections.mapLeaderboard?.findOne({ mapId: COUNTRY_STREAKS_ID })

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

export default updateGame
