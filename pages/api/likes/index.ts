import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

/* eslint-disable import/no-anonymous-default-export */
import { collections, dbConnect } from '@backend/utils/dbConnect'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    // Marks this map as liked by this user
    if (req.method === 'POST') {
      const userId = req.headers.uid as string
      const mapId = req.body.mapId as string

      const result = await collections.mapLikes?.insertOne({ userId: new ObjectId(userId), mapId: new ObjectId(mapId) })

      if (!result) {
        return res.status(500).send(`Failed to add like to map with id: ${mapId}`)
      }

      res.status(201).send(result.insertedId)
    }

    // Gets a user's liked maps -> returns 10 maps if {count} not passed
    else if (req.method === 'GET') {
      const userId = req.headers.uid as string
      const count = Number(req.query.count as string)

      if (!userId) {
        return res.status(400).send(`Missing userId in query params`)
      }

      const likedMaps = await collections.mapLikes
        ?.aggregate([
          { $match: { userId: new ObjectId(userId) } },
          {
            $lookup: {
              from: 'maps',
              localField: 'mapId',
              foreignField: '_id',
              as: 'mapDetails',
            },
          },
          {
            $unwind: '$mapDetails',
          },
        ])
        .limit(count || 10)
        .toArray()

      if (!likedMaps) {
        return res.status(400).send(`Failed to get users liked maps with user id: ${userId}`)
      }

      res.status(200).send(likedMaps)
    } else {
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false })
  }
}
