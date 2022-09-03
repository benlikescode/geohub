import { NextApiRequest, NextApiResponse } from 'next'

/* eslint-disable import/no-anonymous-default-export */
import { collections, dbConnect } from '@backend/utils/dbConnect'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    if (req.method === 'POST') {
      const { userId, mapId } = req.body

      const result = await collections.mapLikes?.insertOne({ userId: userId, mapId: mapId })

      if (!result) {
        return res.status(500).send(`Failed to add like to map with id: ${mapId}`)
      }

      res.status(201).send(result.insertedId)
    } else if (req.method === 'GET') {
      const userId = req.query.userId as string
      const count = Number(req.query.count as string)

      if (!userId) {
        return res.status(400).send(`Missing userId in query params`)
      }

      const query = { userId: userId }
      const likedMaps = await collections.mapLikes
        ?.aggregate([
          { $match: query },
          {
            $lookup: {
              from: 'maps',
              localField: 'mapId',
              foreignField: 'slug',
              as: 'mapDetails',
            },
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
