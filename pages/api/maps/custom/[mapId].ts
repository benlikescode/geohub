import { ObjectId } from 'mongodb'
/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { collections, dbConnect } from '@backend/utils/dbConnect'
import { throwError } from '@backend/utils/helpers'
import { LocationType } from '@types'

type ReqBody = {
  name?: string
  description?: string
  previewImg?: string
  isPublished?: boolean
  locations?: LocationType[]
}

type UpdatedMap = { name?: string; description?: string; previewImg?: string; isPublished?: boolean }

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    const mapId = req.query.mapId as string

    if (!mapId) {
      return throwError(res, 400, 'You must pass a valid mapId')
    }

    const session = await getSession({ req })

    if (!session) {
      return throwError(res, 401, 'You must be logged in')
    }

    const userId = session.user.id

    const mapDetails = await collections.maps?.findOne({ _id: new ObjectId(mapId) })

    if (!mapDetails) {
      return throwError(res, 400, `Failed to find map details`)
    }

    // GET custom map
    if (req.method === 'GET') {
      // Verify that this map belongs to this user
      if (userId !== mapDetails.creator?.toString()) {
        return throwError(res, 401, 'You are not authorized to view this page')
      }

      // Get corresponding locations
      const locations = await collections.userLocations?.find({ mapId: new ObjectId(mapId) }).toArray()

      if (!locations) {
        return throwError(res, 400, 'Failed to get locations for map')
      }

      res.status(200).send({ ...mapDetails, locations })
    }

    // UPDATE custom map
    else if (req.method === 'PUT') {
      if (userId !== mapDetails.creator?.toString()) {
        return throwError(res, 401, 'You can only make changes to maps you create')
      }

      let updatedMap: UpdatedMap = {}

      const { name, description, previewImg, isPublished, locations } = req.body as ReqBody

      if (name) {
        updatedMap['name'] = name
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
        const removeResult = await collections.userLocations?.deleteMany({ mapId: new ObjectId(mapId) })

        if (!removeResult) {
          return throwError(res, 400, 'Something went wrong updating locations')
        }

        // Attach mapId to each location
        locations.map((location) => {
          location.mapId = new ObjectId(mapId)
        })

        // Finally insert the new locations (if not empty)
        if (locations.length > 0) {
          const result = await collections.userLocations?.insertMany(locations)

          if (!result) {
            return throwError(res, 400, 'Could not add locations')
          }
        }
      }

      return res.status(200).send({ message: 'Map was successfully updated' })
    }

    // DELETE custom map
    else if (req.method === 'DELETE') {
      if (userId !== mapDetails.creator?.toString()) {
        return throwError(res, 401, 'You do not have permission to delete this map')
      }

      // Remove map as a liked map for all users
      await collections.mapLikes?.deleteMany({ mapId: new ObjectId(mapId) })

      // Mark map as deleted in DB
      const markMapAsDeleted = await collections.maps?.updateOne(
        { _id: new ObjectId(mapId) },
        { $set: { isDeleted: true } }
      )

      if (!markMapAsDeleted) {
        return throwError(res, 400, 'An unexpected error occured while trying to delete')
      }

      // Choosing not to remove locations, atleast for now -> since ongoing games may still need locations
      // // Remove it's locations
      // const deleteLocations = await collections.userLocations?.deleteMany({ mapId: new ObjectId(mapId) })

      // if (!deleteLocations) {
      //   return throwError(res, 400, `There was a problem removing the locations from map with id: ${mapId}`)
      // }

      return res.status(200).send({ message: 'Map was successfully deleted' })
    } else {
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false })
  }
}
