import { ObjectId } from 'bson'
import { NextApiRequest, NextApiResponse } from 'next'
import { ChallengeType, DistanceType, GuessType } from '../../../@types'
import calculateDistance from '../../../utils/helpers/calculateDistance'
import calculateRoundScore from '../../../utils/helpers/calculateRoundScore'
import { Game } from '../../models'
import { collections } from '../../utils/dbConnect'
import getUserId from '../../utils/getUserId'
import { getLocations, throwError } from '../../utils/helpers'

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

  // Add new location if game type is not a challenge and game is not finished
  if (!isGameFinished) {
    // Country Streak Challenge
    if (game.mode === 'streak' && game.challengeId) {
      const query = { _id: new ObjectId(game.challengeId) }
      const challenge = (await collections.challenges?.findOne(query)) as ChallengeType

      // Need to generate more rounds
      if (localRound + 1 > challenge.locations.length) {
        const newLocations = await getLocations(game.mapId, 10)

        if (!newLocations) {
          return throwError(res, 400, 'Failed to get new location')
        }

        // Add new locations to the challenge document
        challenge.locations = challenge.locations.concat(newLocations)

        const updatedChallenge = await collections.challenges?.findOneAndUpdate(query, { $set: challenge })

        if (!updatedChallenge) {
          return throwError(res, 500, 'Failed to get next round')
        }

        // Add new locations to this user's game document
        game.rounds = game.rounds.concat(newLocations)
      }

      // Updates the previously generated round to the coordinates returned by the Google SV Pano
      if (adjustedLocation) {
        game.rounds[localRound - 1] = adjustedLocation
      }

      game.rounds = challenge.locations
    }

    // Single Player
    if (!game.challengeId) {
      const newLocation = await getLocations(game.mapId)

      if (!newLocation) {
        return throwError(res, 400, 'Failed to get new location')
      }

      // Updates the previously generated round to the coordinates returned by the Google SV Pano
      if (adjustedLocation) {
        game.rounds[localRound - 1] = adjustedLocation
      }

      game.rounds = game.rounds.concat(newLocation)
    }
  }

  // Calculate distance and points for this guess
  const map = await collections.maps?.findOne({ _id: game.mapId })

  const metricDistance = calculateDistance(guess, game.rounds[game.round - 1], 'metric')
  const imperialDistance = calculateDistance(guess, game.rounds[game.round - 1], 'imperial')

  const distance: DistanceType = {
    metric: metricDistance,
    imperial: imperialDistance,
  }

  const points = calculateRoundScore(metricDistance, map?.scoreFactor)

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

  res.status(200).send(game)
}

export default updateGame
