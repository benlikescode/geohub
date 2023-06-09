import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { collections, getUserId } from '@backend/utils'

const likeMap = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = await getUserId(req, res)
  const mapId = req.query.id as string

  const result = await collections.mapLikes?.insertOne({ userId: new ObjectId(userId), mapId: new ObjectId(mapId) })

  if (!result) {
    return res.status(500).send(`Failed to add like to map with id: ${mapId}`)
  }

  res.status(201).send(result.insertedId)
}

export default likeMap
