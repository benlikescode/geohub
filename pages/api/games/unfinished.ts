/* eslint-disable import/no-anonymous-default-export */
import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

import { collections, dbConnect } from '@backend/utils/dbConnect'
import { throwError } from '@backend/utils/helpers'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()
    const userId = req.headers.uid as string

    if (req.method === 'GET') {
      const page = req.query.page ? Number(req.query.page) : 0
      const gamesPerPage = 20

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
    } else {
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false })
  }
}
