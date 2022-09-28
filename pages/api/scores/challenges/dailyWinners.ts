import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

/* eslint-disable import/no-anonymous-default-export */
import { collections, dbConnect } from '@backend/utils/dbConnect'
import { throwError } from '@backend/utils/helpers'
import { dayAgo, weekAgo } from '@backend/utils/queryDates'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    if (req.method === 'GET') {
      const games = []
      const challenges = await collections.challenges?.find({ createdAt: { $gte: weekAgo, $lte: dayAgo } }).toArray()

      if (!challenges) {
        return throwError(res, 400, 'Could not find recent challenges')
      }

      for (const challenge of challenges) {
        const gamesData = await collections.games
          ?.aggregate([
            { $match: { challengeId: new ObjectId(challenge._id) } },
            { $sort: { totalPoints: -1 } },
            { $limit: 1 },
            {
              $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'userDetails',
              },
            },
            {
              $unwind: '$userDetails',
            },
            {
              $project: {
                gameId: '$_id',
                totalPoints: 1,
                totalTime: 1,
                createdAt: 1,
                userId: '$userDetails._id',
                userName: '$userDetails.name',
                userAvatar: '$userDetails.avatar',
              },
            },
          ])
          .toArray()

        if (gamesData && gamesData?.length === 1) {
          games.push(gamesData[0])
        }
      }
      res.status(200).send(games)
    } else {
      res.status(500).json('Nothing to see here.')
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false })
  }
}
