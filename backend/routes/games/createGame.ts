import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import Game from '@backend/models/game'
import { collections, getLocations, getUserId, throwError } from '@backend/utils'

const createGame = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = await getUserId(req, res)
  const { mode, mapId } = req.body

  const locations = await getLocations(mapId)

  if (!locations) {
    return throwError(res, 400, 'Failed to get locations')
  }

  const newGame = {
    ...req.body,
    mapId: mode === 'standard' ? new ObjectId(mapId) : mapId,
    userId: new ObjectId(userId),
    guesses: [],
    rounds: locations,
    round: 1,
    totalPoints: 0,
    totalDistance: { metric: 0, imperial: 0 },
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
