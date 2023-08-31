import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { collections, getUserId, throwError } from '@backend/utils'

// HALP -> likely want to paginate in future
const getCustomMaps = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = await getUserId(req, res)
  const queryUserId = req.query.userId as string

  if (queryUserId) {
    const customMaps = await collections.maps
      ?.find({ creator: new ObjectId(queryUserId), isDeleted: { $exists: false }, isPublished: true })
      .sort({ createdAt: -1 })
      .toArray()

    if (!customMaps) {
      return throwError(res, 400, 'Failed to get users maps')
    }

    return res.status(200).send(customMaps)
  }

  const customMaps = await collections.maps
    ?.find({ creator: new ObjectId(userId), isDeleted: { $exists: false } })
    .sort({ createdAt: -1 })
    .toArray()

  if (!customMaps) {
    return throwError(res, 400, 'Could not retrieve your maps')
  }

  res.status(200).send(customMaps)
}

export default getCustomMaps
