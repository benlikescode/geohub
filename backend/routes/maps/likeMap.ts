import { ObjectId } from 'bson'
import { NextApiResponse } from 'next'
import NextApiRequestWithSession from '../../types/NextApiRequestWithSession'
import { collections } from '../../utils/dbConnect'

const likeMap = async (req: NextApiRequestWithSession, res: NextApiResponse) => {
  const userId = req.user.id
  const mapId = req.body.mapId as string

  const result = await collections.mapLikes?.insertOne({ userId: new ObjectId(userId), mapId: new ObjectId(mapId) })

  if (!result) {
    return res.status(500).send(`Failed to add like to map with id: ${mapId}`)
  }

  res.status(201).send(result.insertedId)
}

export default likeMap
