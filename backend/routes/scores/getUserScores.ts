import { ObjectId } from 'mongodb'
import { NextApiResponse } from 'next'
import NextApiRequestWithSession from '../../types/NextApiRequestWithSession'
import { collections } from '../../utils/dbConnect'

const getUserScores = async (req: NextApiRequestWithSession, res: NextApiResponse) => {
  const userId = req.query.id as string
  const page = req.query.page ? Number(req.query.page) : 0
  const gamesPerPage = 20

  const query = { userId: new ObjectId(userId), mode: 'standard', state: 'finished' }
  const games = await collections.games
    ?.aggregate([
      { $match: query },
      { $sort: { totalPoints: -1 } },
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
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'userDetails',
        },
      },
    ])
    .toArray()

  if (!games) {
    return res.status(404).send(`Failed to find games for user with id: ${userId}`)
  }

  const data = games.slice(0, gamesPerPage).map((item) => ({
    _id: item._id,
    userId: item.userId,
    userName: item.userDetails[0].name,
    userAvatar: item.userDetails[0].avatar,
    totalPoints: item.totalPoints,
    totalTime: item.totalTime,
  }))

  // We set limit to gamesPerPage + 1 so we know if there is atleast 1 more game after this batch
  // Note that we still slice the response to only return gamesPerPage elements
  const hasMore = games.length > gamesPerPage

  res.status(200).send({
    data,
    hasMore,
  })
}

export default getUserScores
