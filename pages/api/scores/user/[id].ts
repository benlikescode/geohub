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
      const data = await collections.games
        ?.aggregate([
          { $match: query },
          { $sort: { totalPoints: -1 } },
          { $skip: page * gamesPerPage },
          { $limit: gamesPerPage },
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

      if (!data) {
        return res.status(404).send(`Failed to find data`)
      }

      res.status(200).send(
        data.map((item) => ({
          userId: item.userId,
          userName: item.userDetails[0].name,
          userAvatar: item.userDetails[0].avatar,
          gameId: item._id,
          totalPoints: item.totalPoints,
          totalTime: item.totalTime,
        }))
      )
    } else {
      res.status(500).json('Nothing to see here.')
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false })
  }
}
