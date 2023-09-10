import { NextApiRequest, NextApiResponse } from 'next'
import { collections, throwError, verifyUser } from '@backend/utils'

const getUsersLikedMaps = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = await verifyUser(req, res)
  if (!userId) return throwError(res, 401, 'Unauthorized')

  const count = Number(req.query.count as string)

  const likedMaps = await collections.mapLikes
    ?.aggregate([
      { $match: { userId } },
      {
        $lookup: {
          from: 'maps',
          localField: 'mapId',
          foreignField: '_id',
          as: 'mapDetails',
        },
      },
      {
        $unwind: '$mapDetails',
      },
    ])
    .limit(count || 10)
    .toArray()

  if (!likedMaps) {
    return throwError(res, 400, 'Failed to get liked maps')
  }

  res.status(200).send(likedMaps)
}

export default getUsersLikedMaps
