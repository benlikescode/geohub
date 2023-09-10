import { NextApiRequest, NextApiResponse } from 'next'
import { Map } from '@backend/models'
import { collections, throwError, verifyUser } from '@backend/utils'
import { createCustomMapSchema } from '@backend/validations/mapValidations'

const createCustomMap = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = await verifyUser(req, res)
  if (!userId) return throwError(res, 401, 'Unauthorized')

  const { name, description, avatar } = createCustomMapSchema.parse(req.body)

  const newMap = {
    name,
    description,
    previewImg: avatar,
    creator: userId,
    createdAt: new Date(),
    isPublished: false,
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
