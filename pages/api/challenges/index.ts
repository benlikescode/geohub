import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

/* eslint-disable import/no-anonymous-default-export */
import { collections, dbConnect } from '@backend/utils/dbConnect'
import { getRandomLocations } from '@utils/functions/generateLocations'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    if (req.method === 'POST') {
      const { mapId, gameSettings } = req.body
      const locations = getRandomLocations('handpicked', req.body.mapId)
      const creatorId = new ObjectId(req.body.userId)

      if (locations === null) {
        return res.status(400).send('Invalid Map Id, Challenge could not be created')
      }

      const newChallenge = {
        mapId,
        gameSettings,
        locations,
        creatorId,
      }

      // Create Challenge
      const result = await collections.challenges?.insertOne(newChallenge)

      if (!result) {
        return res.status(500).send('Failed to create a new challenge.')
      }

      res.status(201).send(result.insertedId)
    } else {
      res.status(500).json({ message: 'Invalid request' })
    }
  } catch (err) {
    console.log(err)
    res.status(400).json({ success: false })
  }
}
