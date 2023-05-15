import { ObjectId } from 'bson'
import { NextApiResponse } from 'next'
import NextApiRequestWithSession from '../../types/NextApiRequestWithSession'
import { collections } from '../../utils/dbConnect'
import { throwError } from '../../utils/helpers'

const getRecentlyPlayedMaps = async (req: NextApiRequestWithSession, res: NextApiResponse) => {
  const userId = req.user.id

  const games = await collections.games
    ?.aggregate([
      { $match: { userId: new ObjectId(userId) } },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: '$mapId',
          createdAt: { $first: '$createdAt' },
        },
      },
      {
        $lookup: {
          from: 'maps',
          localField: '_id',
          foreignField: '_id',
          as: 'mapDetails',
        },
      },
      {
        $unwind: '$mapDetails',
      },
      {
        $project: {
          _id: '$mapDetails._id',
          previewImg: '$mapDetails.previewImg',
          name: '$mapDetails.name',
          createdAt: 1,
        },
      },
      { $sort: { createdAt: -1 } },
    ])
    .limit(5)
    .toArray()

  if (!games) {
    return throwError(res, 400, 'Could not find any recent games for this user')
  }

  res.status(200).send(games)
}

export default getRecentlyPlayedMaps
