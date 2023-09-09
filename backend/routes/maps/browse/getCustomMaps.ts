import { NextApiRequest, NextApiResponse } from 'next'
import { collections, throwError } from '@backend/utils'

const getCustomMaps = async (req: NextApiRequest, res: NextApiResponse) => {
  const page = req.query.page ? Number(req.query.page) : 0
  const mapsPerPage = 28

  const maps = await collections.maps
    ?.find({
      isPublished: true,
      isDeleted: { $exists: false },
      creator: { $ne: 'GeoHub' },
    })
    .skip(page * mapsPerPage)
    .limit(mapsPerPage + 1)
    .toArray()

  if (!maps) {
    return throwError(res, 400, 'Failed to get official maps')
  }

  const data = maps.slice(0, mapsPerPage)
  const hasMore = maps.length > mapsPerPage

  res.status(200).send({
    data,
    hasMore,
  })
}

export default getCustomMaps
