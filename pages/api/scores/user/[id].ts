import { ObjectId } from 'bson'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { getToken } from 'next-auth/jwt'

/* eslint-disable import/no-anonymous-default-export */
import { collections, dbConnect } from '@backend/utils/dbConnect'

import { throwError } from '../../../../backend/utils/helpers'
import { authOptions } from '../../auth/[...nextauth]'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    // Paginated endpoint to get a specified user's game history
    if (req.method === 'GET') {
      // const token = await getToken({ req })
      const session = await getServerSession(req, res, authOptions)

      if (!session) {
        return throwError(res, 401, 'You are not authorized')
      }

      const userId = session.user.id
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
