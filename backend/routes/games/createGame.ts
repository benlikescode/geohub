import { NextApiRequest, NextApiResponse } from 'next'
import { GameModel } from '@backend/models'
import { collections, getLocations, throwError, verifyUser } from '@backend/utils'
import { createGameSchema } from '@backend/validations/gameValidations'

const createGame = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = await verifyUser(req, res)
  if (!userId) return throwError(res, 401, 'Unauthorized')

  const { mapId, mode, gameSettings } = createGameSchema.parse(req.body)

  const locations = await getLocations(mapId, mode)

  if (!locations) {
    return throwError(res, 400, 'Failed to get locations')
  }

  const newGame = {
    mapId,
    gameSettings,
    mode,
    userId,
    guesses: [],
    rounds: locations,
    round: 1,
    totalPoints: 0,
    totalDistance: { metric: 0, imperial: 0 },
    totalTime: 0,
    streak: 0,
    state: 'started',
    createdAt: new Date(),
  } as GameModel

  // Create game
  const result = await collections.games?.insertOne(newGame)

  if (!result) {
    return res.status(500).send('Failed to create a new game.')
  }

  res.status(201).send({ _id: result.insertedId, ...newGame })
}

export default createGame
