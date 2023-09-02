import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { calculateMapScoreFactor, collections, getMapBounds, getUserId, throwError } from '@backend/utils'
import { ChangedLocationsType, LocationType } from '@types'
import { MAX_ALLOWED_CUSTOM_LOCATIONS, MIN_ALLOWED_CUSTOM_LOCATIONS } from '@utils/constants/random'
import { formatLargeNumber } from '@utils/helpers'

type ReqBody = {
  name?: string
  description?: string
  previewImg?: string
  isPublished?: boolean
  locations?: ChangedLocationsType
}

type UpdatedMap = {
  name?: string
  description?: string
  previewImg?: string
  isPublished?: boolean
  lastUpdatedAt?: Date
}

const updateCustomMap = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = await getUserId(req, res)
  const mapId = req.query.mapId as string

  if (!mapId) {
    return throwError(res, 400, 'You must pass a valid mapId')
  }

  const mapDetails = await collections.maps?.findOne({ _id: new ObjectId(mapId) })

  if (!mapDetails) {
    return throwError(res, 400, `Failed to find map details`)
  }

  // Verify user is updating their own map
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

  updatedMap.lastUpdatedAt = new Date()

  const result = await collections.maps?.findOneAndUpdate({ _id: new ObjectId(mapId) }, { $set: updatedMap })

  if (!result) {
    return throwError(res, 400, 'Could not update map details')
  }

  if (locations) {
    const { additions, modifications, deletions } = locations

    if (additions.length || modifications.length || deletions.length) {
      const currentLocationsCount = await collections.userLocations?.find({ mapId: new ObjectId(mapId) }).count()

      if (currentLocationsCount === undefined) {
        return throwError(res, 500, 'Failed to add new locations')
      }

      // Min and Max number of locations validation
      const newLocationsCount = currentLocationsCount + additions.length - deletions.length

      if (newLocationsCount < MIN_ALLOWED_CUSTOM_LOCATIONS) {
        return throwError(res, 400, `Must have as least ${MIN_ALLOWED_CUSTOM_LOCATIONS} locations`)
      }

      if (newLocationsCount > MAX_ALLOWED_CUSTOM_LOCATIONS) {
        return throwError(res, 400, `The max locations allowed is ${formatLargeNumber(MAX_ALLOWED_CUSTOM_LOCATIONS)}`)
      }

      // Attach mapId to each location
      additions.map((location) => {
        location.mapId = new ObjectId(mapId)
      })

      modifications.map((location) => {
        location.mapId = new ObjectId(mapId)
      })

      // We are good, so insert the locations
      // const upsertAdditionsAndChanges = await collections.userLocations?.updateMany(
      //   { mapId: new ObjectId(mapId) },
      //   { $set: [...additions, ...modifications] },
      //   { upsert: true }
      // )

      if (additions.length) {
        const insertAdditions = await collections.userLocations?.insertMany(additions as any)

        if (!insertAdditions) {
          return throwError(res, 500, 'Failed to add new locations')
        }
      }

      if (modifications.length) {
        const bulkOperations = modifications.map((newDocument) => {
          const { _id, ...replacement } = newDocument

          return {
            replaceOne: {
              filter: { _id: new ObjectId(newDocument._id) },
              replacement: replacement,
            },
          }
        })

        const updateModifications = await collections.userLocations?.bulkWrite(bulkOperations)

        if (!updateModifications) {
          return throwError(res, 500, 'Failed to update locations')
        }
      }

      if (deletions.length) {
        const idObjectsToDelete = deletions.map((idString) => new ObjectId(idString))

        const removeDeletions = await collections.userLocations?.deleteMany({ _id: { $in: idObjectsToDelete } })

        if (!removeDeletions) {
          return throwError(res, 500, 'Failed to remove existing locations')
        }
      }

      const newLocations = await collections.userLocations?.find({ mapId: new ObjectId(mapId) }).toArray()

      if (!newLocations) {
        return throwError(res, 500, 'Failed to update map bounds')
      }

      // Update map's score factor (since locations have changed)
      const newBounds = getMapBounds(newLocations as LocationType[])
      const newScoreFactor = calculateMapScoreFactor(newBounds)

      const updateMap = await collections.maps?.updateOne(
        { _id: new ObjectId(mapId) },
        { $set: { bounds: newBounds, scoreFactor: newScoreFactor } }
      )

      if (!updateMap) {
        return throwError(res, 400, 'Failed to save new map score factor')
      }

      return res.status(200).send({ message: 'Map was successfully updated', locations: newLocations })
    }
  }

  res.status(200).send({ message: 'Map was successfully updated' })
}

export default updateCustomMap
