import { ObjectId } from 'bson'
import { NextApiResponse } from 'next'
import NextApiRequestWithSession from '../../types/NextApiRequestWithSession'
import { collections } from '../../utils/dbConnect'
import { getLocations } from '../../utils/helpers'

const createChallenge = async (req: NextApiRequestWithSession, res: NextApiResponse) => {
  const userId = req.user.id
  const { mapId, gameSettings, mode } = req.body

  const numLocationsToGenerate = mode === 'streak' ? 10 : 5
  const locations = await getLocations(mapId, numLocationsToGenerate)

  if (locations === null) {
    return res.status(400).send('Invalid map Id, challenge could not be created')
  }

  const newChallenge = {
    mapId: mode === 'standard' ? new ObjectId(mapId) : mapId,
    creatorId: new ObjectId(userId),
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
