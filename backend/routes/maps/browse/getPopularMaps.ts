import { NextApiRequest, NextApiResponse } from 'next'
import { collections, throwError } from '@backend/utils'
import { objectIdSchema } from '@backend/validations/objectIdSchema'

const getPopularMaps = async (req: NextApiRequest, res: NextApiResponse) => {
  // HALP -> Sort maps by most liked -> going to need to query the mapLikes collection
  const countQuery = req.query.count as string
  const mapCount = Number(countQuery)
  const mapId = objectIdSchema.parse(req.query.mapId)

  const maps = await collections.maps
    ?.find({
      _id: { $ne: mapId },
      isPublished: true,
      isDeleted: { $exists: false },
    })
    .limit(mapCount || 3)
    .toArray()

  if (!maps) {
    return throwError(res, 400, 'Failed to get popular maps')
  }

  res.status(200).send(maps)
}

export default getPopularMaps
