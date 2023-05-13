import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

/* eslint-disable import/no-anonymous-default-export */
import { collections, dbConnect } from '@backend/utils/dbConnect'
import { getLocations } from '@backend/utils/helpers'

import { LocationType } from '../../../@types'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    // Creates a challenge
    if (req.method === 'POST') {
      const { mapId, gameSettings, mode, userId } = req.body

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
    } else {
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (err) {
    console.log(err)
    res.status(400).json({ success: false })
  }
}
