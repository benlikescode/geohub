import { NextApiRequest, NextApiResponse } from 'next'
import { collections, compareObjectIds, throwError, verifyUser } from '@backend/utils'
import { objectIdSchema } from '@backend/validations/objectIdSchema'

const deleteCustomMap = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = await verifyUser(req, res)
  if (!userId) return throwError(res, 401, 'Unauthorized')

  const mapId = objectIdSchema.parse(req.query.mapId)

  const mapDetails = await collections.maps?.findOne({ _id: mapId })

  if (!mapDetails) {
    return throwError(res, 400, `Failed to find map details`)
  }

  if (!compareObjectIds(userId, mapDetails.creator)) {
    return throwError(res, 401, 'You do not have permission to delete this map')
  }

  // Remove map as a liked map for all users
  await collections.mapLikes?.deleteMany({ mapId })

  // Mark map as deleted in DB
  const markMapAsDeleted = await collections.maps?.updateOne({ _id: mapId }, { $set: { isDeleted: true } })

  if (!markMapAsDeleted) {
    return throwError(res, 400, 'An unexpected error occured while trying to delete')
  }

  // Remove it's locations
  const deleteLocations = await collections.userLocations?.deleteMany({ mapId })

  if (!deleteLocations) {
    return throwError(res, 400, 'Failed to remove locations from map')
  }

  res.status(200).send({ message: 'Map was successfully deleted' })
}

export default deleteCustomMap
