import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { collections, compareObjectIds, throwError, verifyUser } from '@backend/utils'

const deleteCustomMap = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = await verifyUser(req, res)
  if (!userId) return throwError(res, 401, 'Unauthorized')

  const mapId = req.query.mapId as string

  if (!mapId) {
    return throwError(res, 400, 'You must pass a valid mapId')
  }

  const mapDetails = await collections.maps?.findOne({ _id: new ObjectId(mapId) })

  if (!mapDetails) {
    return throwError(res, 400, `Failed to find map details`)
  }

  if (!compareObjectIds(userId, mapDetails.creator)) {
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

  // Remove it's locations
  const deleteLocations = await collections.userLocations?.deleteMany({ mapId: new ObjectId(mapId) })

  if (!deleteLocations) {
    return throwError(res, 400, `There was a problem removing the locations from map with id: ${mapId}`)
  }

  res.status(200).send({ message: 'Map was successfully deleted' })
}

export default deleteCustomMap
