import { NextApiRequest, NextApiResponse } from 'next'
import { collections, getQueryLimit, throwError } from '@backend/utils'
import { objectIdSchema } from '@backend/validations/objectIdSchema'

const getPopularMaps = async (req: NextApiRequest, res: NextApiResponse) => {
  const mapId = objectIdSchema.parse(req.query.mapId)
  const limit = getQueryLimit(req.query.count, 3)

  const maps = await collections.maps
    ?.find({
      _id: { $ne: mapId },
      isPublished: true,
      isDeleted: { $exists: false },
    })
    .limit(limit)
    .toArray()

  if (!maps) {
    return throwError(res, 400, 'Failed to get popular maps')
  }

  res.status(200).send(maps)
}

export default getPopularMaps
