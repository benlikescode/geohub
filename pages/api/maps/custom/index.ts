import { ObjectId } from 'mongodb'
/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next'

import { collections, dbConnect } from '@backend/utils/dbConnect'
import { throwError } from '@backend/utils/helpers'
import { MapType } from '@types'
import { getMapSlug } from '@utils/helperFunctions'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    // Gets your custom maps - should likely be paginated - likely want to get official maps here if user is admin - need better auth though
    if (req.method === 'GET') {
      const userId = req.query.userId as string

      if (!userId) {
        return throwError(res, 400, 'A userId is required')
      }

      const customMaps = await collections.maps
        ?.find({ creator: new ObjectId(userId) })
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
        usersPlayed: 0,
        isPublished: false,
        slug: getMapSlug(name),
      } as MapType

      const result = await collections.maps?.insertOne(newMap)

      if (!result) {
        return throwError(res, 500, 'Failed to create map, please try again later')
      }

      res.status(201).send({
        mapId: result.insertedId,
        message: 'Successfully created map',
      })
    } else {
      res.status(500).json({ message: 'Invalid request' })
    }
  } catch (err) {
    console.log(err)
    res.status(400).json({ success: false })
  }
}
