import { ObjectId } from 'bson'
import { NextApiRequest, NextApiResponse } from 'next'

/* eslint-disable import/no-anonymous-default-export */
import { collections, dbConnect } from '@backend/utils/dbConnect'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    // Paginated endpoint to get a specified user's game history
    if (req.method === 'GET') {
      const userId = req.query.id as string
      const page = req.query.page ? Number(req.query.page) : 0
      const gamesPerPage = 20

      const query = { userId: new ObjectId(userId), round: 6 }
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

      // we set limit to gamesPerPage + 1 so we know if there is atleast 1 more game after this batch
      // note that we still slice the response to only return gamesPerPage elements
      const hasMore = games.length > gamesPerPage

      res.status(200).send({
        data,
        hasMore,
      })
    } else {
      res.status(500).json('Nothing to see here.')
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false })
  }
}
