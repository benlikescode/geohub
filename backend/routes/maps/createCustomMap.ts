import { ObjectId } from 'mongodb'
import { NextApiResponse } from 'next'
import { Map } from '@backend/models'
import NextApiRequestWithSession from '../../types/NextApiRequestWithSession'
import { collections } from '../../utils/dbConnect'
import { throwError } from '../../utils/helpers'

const createCustomMap = async (req: NextApiRequestWithSession, res: NextApiResponse) => {
  const { name, description, avatar } = req.body
  const creatorId = req.user.id

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
