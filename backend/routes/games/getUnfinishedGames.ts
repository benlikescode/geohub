import { NextApiRequest, NextApiResponse } from 'next'
import { collections, throwError, verifyUser } from '@backend/utils'

const getUnfinishedGames = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = await verifyUser(req, res)
  if (!userId) return throwError(res, 401, 'Unauthorized')

  const page = req.query.page ? Number(req.query.page) : 0
  const gamesPerPage = 20

  const query = { userId, state: { $ne: 'finished' } }
  const games = await collections.games
    ?.aggregate([
      { $match: query },
      { $sort: { createdAt: -1 } },
      { $skip: page * gamesPerPage },
      { $limit: gamesPerPage + 1 },
      {
        $project: {
          rounds: 0,
          guesses: 0,
        },
      },
      {
        $lookup: {
          from: 'maps',
          localField: 'mapId',
          foreignField: '_id',
          as: 'mapDetails',
        },
      },
      { $unwind: '$mapDetails' },
    ])
    .toArray()

  if (!games) {
    return throwError(res, 400, 'There was a problem fetching your ongoing games')
  }

  const data = games.slice(0, gamesPerPage)
  const hasMore = games.length > gamesPerPage

  res.status(200).send({ data, hasMore })
}

export default getUnfinishedGames
