import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { collections, throwError, verifyUser } from '@backend/utils'

const likeMap = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = await verifyUser(req, res)
  if (!userId) return throwError(res, 401, 'Unauthorized')

  const mapId = req.query.id as string

  if (!mapId) {
    return throwError(res, 400, 'Missing map id')
  }

  const mapLikedByUserQuery = { userId: new ObjectId(userId), mapId: new ObjectId(mapId) }

  // Check if already liked
  const alreadyLiked = await collections.mapLikes?.find(mapLikedByUserQuery).count()

  if (alreadyLiked) {
    return throwError(res, 400, 'You have already liked this map')
  }

  const likeMapResult = await collections.mapLikes?.insertOne(mapLikedByUserQuery)

  if (!likeMapResult) {
    return throwError(res, 500, 'Failed to like map')
  }

  res.status(201).send(likeMapResult.insertedId)
}

export default likeMap
