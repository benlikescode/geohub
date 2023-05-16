import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { Map } from '@backend/models'
import { collections } from '../../utils/dbConnect'
import getUserId from '../../utils/getUserId'
import { throwError } from '../../utils/helpers'

const createCustomMap = async (req: NextApiRequest, res: NextApiResponse) => {
  const creatorId = await getUserId(req, res)
  const { name, description, avatar } = req.body

  if (!name) {
    return throwError(res, 400, 'A map name is required')
  }

  const newMap = {
    name,
    description,
    previewImg: avatar || 'https://wallpaperaccess.com/full/2707446.jpg',
    creator: new ObjectId(creatorId),
    createdAt: new Date(),
    isPublished: true,
  } as Map

  const result = await collections.maps?.insertOne(newMap)

  if (!result) {
    return throwError(res, 500, 'Failed to create map, please try again later')
  }

  res.status(201).send({
    mapId: result.insertedId,
    message: 'Successfully created map',
  })
}

export default createCustomMap
