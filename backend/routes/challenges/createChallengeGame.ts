import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { Game } from '@backend/models'
import getMapFromGame from '@backend/queries/getMapFromGame'
import { collections, throwError, verifyUser } from '@backend/utils'

const createChallengeGame = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await verifyUser(req, res)
  if (!user) return throwError(res, 401, 'Unauthorized')

  const challengeId = req.query.id as string
  const { mapId, mode, gameSettings, locations, isDailyChallenge } = req.body

  // Ensure user has not already played this challenge
  const hasAlreadyPlayed = await collections.games
    ?.find({ challengeId: new ObjectId(challengeId), userId: new ObjectId(user._id) })
    .count()

  if (hasAlreadyPlayed) {
    return throwError(res, 400, 'You have already played this challenge')
  }

  const newGame = {
    mapId: mode === 'standard' ? new ObjectId(mapId) : mapId,
    userId: new ObjectId(user._id),
    challengeId: new ObjectId(challengeId),
    mode,
    gameSettings,
    guesses: [],
    rounds: locations,
    round: 1,
    totalPoints: 0,
    totalDistance: { metric: 0, imperial: 0 },
    totalTime: 0,
    streak: 0,
    state: 'started',
    isDailyChallenge,
    createdAt: new Date(),
  }

  // Create game that is associated with this challenge
  const result = await collections.games?.insertOne(newGame)

  if (!result) {
    return throwError(res, 400, 'Failed to create your game in this challenge')
  }

  const mapDetails = await getMapFromGame(newGame as Game)

  const _id = result.insertedId

  res.status(201).send({ _id, ...newGame, mapDetails })
}
export default createChallengeGame
