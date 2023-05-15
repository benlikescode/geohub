import { ObjectId } from 'mongodb'
import { NextApiResponse } from 'next'
import NextApiRequestWithSession from '../../types/NextApiRequestWithSession'
import { collections } from '../../utils/dbConnect'
import { throwError } from '../../utils/helpers'

const createChallengeGame = async (req: NextApiRequestWithSession, res: NextApiResponse) => {
  const challengeId = req.query.id as string
  const userId = req.user.id
  const { mapId, mode, gameSettings, locations, isDailyChallenge } = req.body

  const newGame = {
    mapId: mode === 'standard' ? new ObjectId(mapId) : mapId,
    userId: new ObjectId(userId),
    challengeId: new ObjectId(challengeId),
    mode,
    gameSettings,
    guesses: [],
    rounds: locations,
    round: 1,
    totalPoints: 0,
    totalDistance: 0,
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

  const id = result.insertedId

  res.status(201).send({ id, ...newGame })
}
export default createChallengeGame
