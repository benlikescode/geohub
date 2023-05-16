import { ObjectId } from 'bson'
import { NextApiRequest, NextApiResponse } from 'next'
import { collections } from '../../utils/dbConnect'
import getUserId from '../../utils/getUserId'

const likeMap = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = await getUserId(req, res)
  const mapId = req.body.mapId as string

  const result = await collections.mapLikes?.insertOne({ userId: new ObjectId(userId), mapId: new ObjectId(mapId) })

  if (!result) {
    return res.status(500).send(`Failed to add like to map with id: ${mapId}`)
  }

  res.status(201).send(result.insertedId)
}

export default likeMap
