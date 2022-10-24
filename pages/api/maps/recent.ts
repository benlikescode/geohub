import { ObjectId } from 'mongodb'
/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next'

import { collections, dbConnect } from '@backend/utils/dbConnect'
import { throwError } from '@backend/utils/helpers'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()
    const userId = req.query.userId as string

    if (!userId) {
      return throwError(res, 400, 'You must pass a valid userId')
    }

    if (req.method === 'GET') {
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
    } else {
      res.status(500).json('Nothing to see here.')
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false })
  }
}
