import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { collections, throwError } from '@backend/utils'

const getPopularMaps = async (req: NextApiRequest, res: NextApiResponse) => {
  // HALP -> Sort maps by most liked -> going to need to query the mapLikes collection
  const countQuery = req.query.count as string
  const mapCount = Number(countQuery)
  const mapId = req.query.mapId as string

  const maps = await collections.maps
    ?.find({
      _id: { $ne: new ObjectId(mapId) },
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
