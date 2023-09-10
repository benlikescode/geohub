import { NextApiRequest, NextApiResponse } from 'next'
import { Challenge, Game } from '@backend/models'
import getMapFromGame from '@backend/queries/getMapFromGame'
import { collections, throwError, verifyUser } from '@backend/utils'
import { objectIdSchema } from '@backend/validations/objectIdSchema'

const createChallengeGame = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = await verifyUser(req, res)
  if (!userId) return throwError(res, 401, 'Unauthorized')

  const challengeId = objectIdSchema.parse(req.query.id)

  // Ensure user hasn't played challenge yet
  const hasAlreadyPlayed = await collections.games?.find({ challengeId, userId }).count()

  if (hasAlreadyPlayed) {
    return throwError(res, 400, 'You have already played this challenge')
  }

  const challenge = (await collections.challenges?.findOne({ _id: challengeId })) as Challenge

  if (!challenge) {
    return throwError(res, 500, 'Failed to find challenge')
  }

  const { mapId, mode, gameSettings, locations, isDailyChallenge } = challenge

  const newGame = {
    mapId,
    userId,
    challengeId,
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
  } as Game

  // Create game that is associated with this challenge
  const result = await collections.games?.insertOne(newGame)

  if (!result) {
    return throwError(res, 400, 'Failed to create your game in this challenge')
  }

  const mapDetails = await getMapFromGame(newGame)

  const _id = result.insertedId

  res.status(201).send({ _id, ...newGame, mapDetails })
}
export default createChallengeGame
