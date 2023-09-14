import { NextApiRequest, NextApiResponse } from 'next'
import { collections, compareObjectIds, throwError, verifyUser } from '@backend/utils'
import { objectIdSchema } from '@backend/validations/objectIdSchema'

// HALP -> likely want to paginate in future
const getCustomMaps = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = await verifyUser(req, res)

  const queryUserId = objectIdSchema.optional().parse(req.query.userId)

  // Gets another user's maps
  if (queryUserId && !compareObjectIds(userId, queryUserId)) {
    const customMaps = await collections.maps
      ?.find({ creator: queryUserId, isDeleted: { $exists: false }, isPublished: true })
      .sort({ createdAt: -1 })
      .toArray()

    if (!customMaps) {
      return throwError(res, 400, 'Failed to get users maps')
    }

    return res.status(200).send(customMaps)
  }

  // Getting our own maps requires auth
  if (!userId) {
    return throwError(res, 401, 'Unauthorized')
  }

  const customMaps = await collections.maps
    ?.find({ creator: userId, isDeleted: { $exists: false } })
    .sort({ createdAt: -1 })
    .toArray()

  if (!customMaps) {
    return throwError(res, 400, 'Could not retrieve your maps')
  }

  res.status(200).send(customMaps)
}

export default getCustomMaps
