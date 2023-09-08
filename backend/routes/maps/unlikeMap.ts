import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { collections, throwError, verifyUser } from '@backend/utils'

const unlikeMap = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = await verifyUser(req, res)
  if (!userId) return throwError(res, 401, 'Unauthorized')

  const mapId = req.query.id as string

  if (!mapId) {
    return throwError(res, 400, 'Missing map id')
  }

  const removedLike = await collections.mapLikes?.deleteMany({
    mapId: new ObjectId(mapId),
    userId: new ObjectId(userId),
  })

  if (!removedLike) {
    return throwError(res, 400, 'Failed to unlike map')
  }

  res.status(200).send({ message: 'Map was successfully unliked' })
}

export default unlikeMap
