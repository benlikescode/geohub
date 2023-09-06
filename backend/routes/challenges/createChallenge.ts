import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import {
  collections,
  getLocations,
  throwError,
  verifyUser
} from '@backend/utils'

const createChallenge = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await verifyUser(req, res)
  if (!user) return throwError(res, 401, 'Unauthorized')

  const { mapId, gameSettings, mode } = req.body

  const numLocationsToGenerate = mode === 'streak' ? 10 : 5
  const locations = await getLocations(mapId, numLocationsToGenerate)

  if (locations === null) {
    return res.status(400).send('Invalid map Id, challenge could not be created')
  }

  const newChallenge = {
    mapId: mode === 'standard' ? new ObjectId(mapId) : mapId,
    creatorId: new ObjectId(user._id),
    mode,
    gameSettings,
    locations,
  }

  // Create Challenge
  const result = await collections.challenges?.insertOne(newChallenge)

  if (!result) {
    return res.status(500).send('Failed to create a new challenge.')
  }

  res.status(201).send(result.insertedId)
}

export default createChallenge
