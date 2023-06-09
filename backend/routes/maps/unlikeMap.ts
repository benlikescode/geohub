import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { collections, getUserId, throwError } from '@backend/utils'

const unlikeMap = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = await getUserId(req, res)
  const mapId = req.query.id as string

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
