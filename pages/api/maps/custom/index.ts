import { ObjectId } from 'mongodb'
/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next'

import { Map } from '@backend/models'
import { collections, dbConnect } from '@backend/utils/dbConnect'
import { throwError } from '@backend/utils/helpers'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    // Gets your custom maps - should likely be paginated - likely want to get official maps here if user is admin - need better auth though
    if (req.method === 'GET') {
      const userId = req.headers.uid as string

      const customMaps = await collections.maps
        ?.find({ creator: new ObjectId(userId), isDeleted: { $exists: false } })
        .sort({ createdAt: -1 })
        .toArray()

      if (!customMaps) {
        return throwError(res, 400, 'Could not retrieve your maps')
      }

      res.status(200).send(customMaps)
    }

    // Creates a custom (user made) map
    else if (req.method === 'POST') {
      const { name, description, avatar, creatorId } = req.body

      if (!name) {
        return throwError(res, 400, 'A map name is required')
      }

      const newMap = {
        name,
        description,
        previewImg: avatar || 'https://wallpaperaccess.com/full/2707446.jpg',
        creator: new ObjectId(creatorId),
        createdAt: new Date(),
        isPublished: true,
      } as Map

      const result = await collections.maps?.insertOne(newMap)

      if (!result) {
        return throwError(res, 500, 'Failed to create map, please try again later')
      }

      res.status(201).send({
        mapId: result.insertedId,
        message: 'Successfully created map',
      })
    } else {
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (err) {
    console.log(err)
    res.status(400).json({ success: false })
  }
}
