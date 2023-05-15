import { ObjectId } from 'mongodb'
import { NextApiResponse } from 'next'
import NextApiRequestWithSession from '../../types/NextApiRequestWithSession'
import { collections } from '../../utils/dbConnect'
import { throwError } from '../../utils/helpers'

const unlikeMap = async (req: NextApiRequestWithSession, res: NextApiResponse) => {
  const userId = req.user.id
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
