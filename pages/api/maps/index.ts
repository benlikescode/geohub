/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next'

import { Map } from '@backend/models'
import { collections, dbConnect } from '@backend/utils/dbConnect'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    // Creates a map
    if (req.method === 'POST') {
      const { name, description, previewImg, creator } = req.body

      if (!name || !description) {
        return res.status(400).send({ message: 'Missing map name or description' })
      }

      const newMap = {
        name,
        description,
        previewImg: previewImg || 'https://wallpaperaccess.com/full/2707446.jpg',
        creator: creator || 'GeoHub',
        createdAt: new Date(),
        usersPlayed: 0,
        locationCount: 0,
        avgScore: 0,
        likes: { numLikes: 0, likedByUser: false },
        isPublished: true,
      } as Map

      const result = await collections.maps?.insertOne(newMap)

      if (!result) {
        return res.status(500).send({ message: 'Failed to create new map' })
      }

      res.status(201).send({ message: 'Map was successfully created' })
    } else {
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (err) {
    console.log(err)
    res.status(400).json({ success: false })
  }
}
