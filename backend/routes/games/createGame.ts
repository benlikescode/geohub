import { ObjectId } from 'mongodb'
import { NextApiResponse } from 'next'
import Game from '@backend/models/game'
import NextApiRequestWithSession from '../../types/NextApiRequestWithSession'
import { collections } from '../../utils/dbConnect'
import { getLocations, throwError } from '../../utils/helpers'

const createGame = async (req: NextApiRequestWithSession, res: NextApiResponse) => {
  const { mode, mapId } = req.body
  const userId = req.user.id

  const roundLocation = await getLocations(mapId)

  if (!roundLocation) {
    return throwError(res, 400, 'Failed to get location')
  }

  const newGame = {
    ...req.body,
    mapId: mode === 'standard' ? new ObjectId(mapId) : mapId,
    userId: new ObjectId(userId),
    guesses: [],
    rounds: [roundLocation],
    round: 1,
    totalPoints: 0,
    totalDistance: 0,
    totalTime: 0,
    streak: 0,
    state: 'started',
    createdAt: new Date(),
  } as Game

  // Create game
  const result = await collections.games?.insertOne(newGame)

  if (!result) {
    return res.status(500).send('Failed to create a new game.')
  }

  res.status(201).send(result.insertedId)
}

export default createGame
