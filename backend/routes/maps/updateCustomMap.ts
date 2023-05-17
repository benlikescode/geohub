import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { LocationType } from '../../../@types'
import calculateMapScoreFactor from '../../utils/calculateMapScoreFactor'
import { collections } from '../../utils/dbConnect'
import getUserId from '../../utils/getUserId'
import { throwError } from '../../utils/helpers'

type ReqBody = {
  name?: string
  description?: string
  previewImg?: string
  isPublished?: boolean
  locations?: LocationType[]
}

type UpdatedMap = { name?: string; description?: string; previewImg?: string; isPublished?: boolean }

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
      const scoreFactor = calculateMapScoreFactor(locations)

      const updateMap = await collections.maps?.updateOne(
        { _id: new ObjectId(mapId) },
        { $set: { scoreFactor: scoreFactor } }
      )

      if (!updateMap) {
        return throwError(res, 400, 'Failed to save new map score factor')
      }
    }
  }

  res.status(200).send({ message: 'Map was successfully updated' })
}

export default updateCustomMap
