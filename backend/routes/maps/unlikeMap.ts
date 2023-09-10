import { NextApiRequest, NextApiResponse } from 'next'
import { collections, throwError, verifyUser } from '@backend/utils'
import { objectIdSchema } from '@backend/validations/objectIdSchema'

const unlikeMap = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = await verifyUser(req, res)
  if (!userId) return throwError(res, 401, 'Unauthorized')

  const mapId = objectIdSchema.parse(req.query.id)

  const removeLike = await collections.mapLikes?.deleteMany({ mapId, userId })

  if (!removeLike) {
    return throwError(res, 400, 'Failed to unlike map')
  }

  res.status(200).send({ message: 'Map was successfully unliked' })
}

export default unlikeMap
