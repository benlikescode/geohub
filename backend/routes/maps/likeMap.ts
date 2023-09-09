import { NextApiRequest, NextApiResponse } from 'next'
import { collections, throwError, verifyUser } from '@backend/utils'
import { objectIdSchema } from '@backend/validations/objectIdSchema'

const likeMap = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = await verifyUser(req, res)
  if (!userId) return throwError(res, 401, 'Unauthorized')

  const mapId = objectIdSchema.parse(req.query.id)

  // Check if already liked
  const alreadyLiked = await collections.mapLikes?.find({ userId, mapId }).count()

  if (alreadyLiked) {
    return throwError(res, 400, 'You have already liked this map')
  }

  const likeMapResult = await collections.mapLikes?.insertOne({ userId, mapId })

  if (!likeMapResult) {
    return throwError(res, 500, 'Failed to like map')
  }

  res.status(201).send(likeMapResult.insertedId)
}

export default likeMap
