import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { calculateMapScoreFactor, collections, getMapBounds, getUserId, throwError } from '@backend/utils'
import { LocationType } from '@types'
import { MAX_ALLOWED_CUSTOM_LOCATIONS } from '@utils/constants/random'
import { formatLargeNumber } from '@utils/helpers'

type ReqBody = {
  name?: string
  description?: string
  previewImg?: string
  isPublished?: boolean
  addedLocations?: LocationType[]
  deletedLocations?: string[]
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

  const { name, description, previewImg, isPublished, addedLocations, deletedLocations } = req.body as ReqBody
  const oldLocations = (await collections.userLocations?.find({ mapId: new ObjectId(mapId) }).toArray() || []).map(doc => doc as unknown as LocationType);

  const newLocations = oldLocations
    .filter(location => {
      const isDeleted = deletedLocations?.some(deletedLocation => deletedLocation === location._id);
      return !isDeleted;
    })
    .concat(addedLocations || []);


  if (name) {
    updatedMap['name'] = name
  }

  if (description) {
    updatedMap['description'] = description
  }

  if (previewImg) {
    updatedMap['previewImg'] = previewImg
  }

  if (newLocations && newLocations.length < 5) {
    return throwError(res, 400, 'Maps must have a minimum of 5 locations')
  }

  if (isPublished !== undefined) {
    updatedMap['isPublished'] = isPublished
  }

  updatedMap.lastUpdatedAt = new Date()

  const result = await collections.maps?.findOneAndUpdate({ _id: new ObjectId(mapId) }, { $set: updatedMap })

  if (!result) {
    return throwError(res, 400, 'Could not update map details')
  }


  // Delete locations from database. Delete before add to handle possible modifications
  if (deletedLocations && deletedLocations.length > 0) {
    console.log("deleting: ", deletedLocations);
    const objectIdArray = deletedLocations.map(id => new ObjectId(id));
    const result = await collections.userLocations?.deleteMany({
      mapId: new ObjectId(mapId),
      _id: { $in: objectIdArray }
    })

    if (!result) {
      return throwError(res, 400, 'Could not delete locations')
    }
    console.log("result: ",result)
  }

  //Add locations to database
  if (addedLocations && addedLocations.length > 0) {
    if (newLocations.length > MAX_ALLOWED_CUSTOM_LOCATIONS) {
      return throwError(res, 400, `The max locations allowed is ${formatLargeNumber(MAX_ALLOWED_CUSTOM_LOCATIONS)}`)
    }

    // Attach mapId to each location
    addedLocations.map((location) => {
      location.mapId = new ObjectId(mapId)
    })

    // Finally insert the new locations (if not empty)
    const result = await collections.userLocations?.insertMany(addedLocations)

    if (!result) {
      return throwError(res, 400, 'Could not add locations')
    }
  }



  // Update map's score factor (since locations have changed)
  if (addedLocations || deletedLocations) {
    const newBounds = getMapBounds(newLocations)
    const newScoreFactor = calculateMapScoreFactor(newBounds)

    const updateMap = await collections.maps?.updateOne(
      { _id: new ObjectId(mapId) },
      { $set: { bounds: newBounds, scoreFactor: newScoreFactor } }
    )

    if (!updateMap) {
      return throwError(res, 400, 'Failed to save new map score factor')
    }
  }

  res.status(200).send({ message: 'Map was successfully updated' })
}

export default updateCustomMap
