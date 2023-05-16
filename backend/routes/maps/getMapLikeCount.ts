import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { collections } from '../../utils/dbConnect'
import getUserId from '../../utils/getUserId'

const getMapLikeCount = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = await getUserId(req, res)
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
