import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import {
  calculateMapScoreFactor,
  collections,
  compareObjectIds,
  getMapBounds,
  throwError,
  verifyUser,
} from '@backend/utils'
import { updateCustomMapSchema } from '@backend/validations/mapValidations'

type UpdatedMap = {
  name?: string
  description?: string
  previewImg?: string
  isPublished?: boolean
  lastUpdatedAt?: Date
}

const updateCustomMap = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = await verifyUser(req, res)
  if (!userId) return throwError(res, 401, 'Unauthorized')

  const { name, description, previewImg, isPublished, locations, mapId } = updateCustomMapSchema.parse({
    ...req.body,
    ...req.query,
  })

  const mapDetails = await collections.maps?.findOne({ _id: new ObjectId(mapId) })

  if (!mapDetails) {
    return throwError(res, 400, `Failed to find map details`)
  }

  // Verify user is updating their own map
  if (!compareObjectIds(userId, mapDetails.creator)) {
    return throwError(res, 401, 'You can only make changes to maps you create')
  }

  let updatedMap: UpdatedMap = {}

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

  updatedMap.lastUpdatedAt = new Date()

  const result = await collections.maps?.findOneAndUpdate({ _id: new ObjectId(mapId) }, { $set: updatedMap })

  if (!result) {
    return throwError(res, 400, 'Could not update map details')
  }

  // HALP -> Really shouldn't be deleting locations and then inserting new
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

      // Update map's score factor (since locations have changed)
      const newBounds = getMapBounds(locations)
      const newScoreFactor = calculateMapScoreFactor(newBounds)

      const updateMap = await collections.maps?.updateOne(
        { _id: new ObjectId(mapId) },
        { $set: { bounds: newBounds, scoreFactor: newScoreFactor } }
      )

      if (!updateMap) {
        return throwError(res, 400, 'Failed to save new map score factor')
      }
    }
  }

  res.status(200).send({ message: 'Map was successfully updated' })
}

export default updateCustomMap
