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
  isUserBanned,
  throwError,
} from '@backend/utils'
import { ChallengeType, DistanceType, GuessType } from '@types'

const updateGame = async (req: NextApiRequest, res: NextApiResponse) => {
  const gameId = req.query.id as string
  const userId = await getUserId(req, res)

  if (!userId) {
    return throwError(res, 401, 'Unauthorized')
  }

  const { isBanned } = await isUserBanned(userId)

  if (isBanned) {
    return throwError(res, 401, 'You are currently banned from playing games')
  }

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

  if (isGameFinished) {
    const host = req.headers.host
    const protocol = req.headers['x-forwarded-proto'] || 'http'
    const baseUrl = `${protocol}://${host}`

    fetch(`${baseUrl}/api/scores/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: process.env.INTERNAL_API_SECRET ?? '',
      },
      body: JSON.stringify({ game }),
    })
  }

  res.status(200).send({ game, mapDetails })
}

export default updateGame
