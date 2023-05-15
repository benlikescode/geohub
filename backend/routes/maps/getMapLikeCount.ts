import { ObjectId } from 'mongodb'
import { NextApiResponse } from 'next'
import NextApiRequestWithSession from '../../types/NextApiRequestWithSession'
import { collections } from '../../utils/dbConnect'

const getMapLikeCount = async (req: NextApiRequestWithSession, res: NextApiResponse) => {
  const userId = req.user.id
  const mapId = req.query.id as string

  const likes = await collections.mapLikes?.countDocuments({ mapId: mapId })

  const likedByUser = await collections.mapLikes?.countDocuments(
    { mapId: new ObjectId(mapId), userId: new ObjectId(userId) },
    { limit: 1 }
  )

  const result = {
    numLikes: likes,
    likedByUser: likedByUser,
  }

  res.status(200).send(result)
}

export default getMapLikeCount
