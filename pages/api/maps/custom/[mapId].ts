import { ObjectId } from 'mongodb'
/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next'

import { collections, dbConnect } from '@backend/utils/dbConnect'
import { throwError } from '@backend/utils/helpers'
import { LocationType } from '@types'
import { getMapSlug } from '@utils/helperFunctions'

type ReqBody = {
  name?: string
  description?: string
  previewImg?: string
  isPublished?: boolean
  locations?: LocationType[]
}

type UpdatedMap = { name?: string; description?: string; previewImg?: string; isPublished?: boolean; slug?: string }

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()
    const mapId = req.query.mapId as string

    if (!mapId) {
      return throwError(res, 400, 'You must pass a valid mapId')
    }

    // GET custom map
    if (req.method === 'GET') {
      const mapDetails = await collections.maps?.findOne({ _id: new ObjectId(mapId) })

      if (!mapDetails) {
        return throwError(res, 400, `Failed to find map details`)
      }

      // Get corresponding locations
      const locations = await collections.locations?.find({ mapId: new ObjectId(mapId) }).toArray()

      if (!locations) {
        return throwError(res, 400, 'Failed to get locations for map')
      }

      res.status(200).send({ ...mapDetails, locations })
    }

    // UPDATE custom map
    else if (req.method === 'PUT') {
      let updatedMap: UpdatedMap = {}

      const { name, description, previewImg, isPublished, locations } = req.body as ReqBody

      if (name) {
        updatedMap['name'] = name
        updatedMap['slug'] = getMapSlug(name)
      }

      if (description) {
        updatedMap['description'] = description
      }

      if (previewImg) {
        updatedMap['previewImg'] = previewImg
      }

      if (isPublished !== undefined) {
        updatedMap['isPublished'] = isPublished
      }

      const result = await collections.maps?.findOneAndUpdate({ _id: new ObjectId(mapId) }, { $set: updatedMap })

      if (!result) {
        return throwError(res, 400, 'Could not update map details')
      }

      if (locations) {
        // Removes old locations
        const removeResult = await collections.locations?.deleteMany({ mapId: new ObjectId(mapId) })

        if (!removeResult) {
          return throwError(res, 400, 'Something went wrong updating locations')
        }

        // Attach mapId to each location
        locations.map((location) => {
          location.mapId = new ObjectId(mapId)
        })

        // Finally insert the new locations (if not empty)
        if (locations.length > 0) {
          const result = await collections.locations?.insertMany(locations)

          if (!result) {
            return throwError(res, 400, 'Could not add locations')
          }
        }
      }

      return res.status(200).send({ message: 'Map was successfully updated' })
    } else {
      res.status(500).json('Nothing to see here.')
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false })
  }
}
