import { ObjectId } from 'bson'
import { NextApiResponse } from 'next'
import NextApiRequestWithSession from '../../types/NextApiRequestWithSession'
import { collections } from '../../utils/dbConnect'
import { throwError } from '../../utils/helpers'

const getUnfinishedGames = async (req: NextApiRequestWithSession, res: NextApiResponse) => {
  const page = req.query.page ? Number(req.query.page) : 0
  const gamesPerPage = 20

  const userId = req.user.id

  const query = { userId: new ObjectId(userId), state: { $ne: 'finished' } }
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
