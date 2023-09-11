import { NextApiRequest, NextApiResponse } from 'next'
import { collections, getLocations, throwError, verifyUser } from '@backend/utils'
import { createGameSchema } from '@backend/validations/gameValidations'

const createChallenge = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = await verifyUser(req, res)
  if (!userId) return throwError(res, 401, 'Unauthorized')

  const { mapId, gameSettings, mode } = createGameSchema.parse(req.body)

  const numLocationsToGenerate = mode === 'streak' ? 10 : 5
  const locations = await getLocations(mapId, mode, numLocationsToGenerate)

  if (locations === null) {
    return throwError(res, 400, 'Failed to get locations for this map')
  }

  const newChallenge = {
    mapId,
    creatorId: userId,
    mode,
    gameSettings,
    locations,
  }

  const createChallenge = await collections.challenges?.insertOne(newChallenge)

  if (!createChallenge) {
    return throwError(res, 500, 'Failed to create new challenge')
  }

  res.status(201).send(createChallenge.insertedId)
}

export default createChallenge
