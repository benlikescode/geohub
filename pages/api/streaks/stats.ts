import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

import { collections, dbConnect } from '@backend/utils/dbConnect'
import { throwError } from '@backend/utils/helpers'

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    if (req.method === 'GET') {
      const LOCATION_COUNT = 250000
      const COUNTRY_COUNT = 98

      // Get average streak
      const avgStreak = await collections.games
        ?.aggregate([
          { $match: { mode: 'streak', state: 'finished' } },
          {
            $group: {
              _id: null,
              avgStreak: { $avg: '$streak' },
            },
          },
        ])
        .toArray()

      if (!avgStreak) {
        return throwError(res, 404, `Failed to get average streak`)
      }

      const adjustedAvgStreak = avgStreak.length ? Math.ceil(avgStreak[0].avgStreak) : 0

      // Get number of explorers
      const explorers = await collections.games
        ?.aggregate([
          { $match: { mode: 'streak' } },
          {
            $group: {
              _id: '$userId',
            },
          },
        ])
        .toArray()

      if (!explorers) return throwError(res, 400, 'Failed to get the number of explorers')

      const result = {
        avgStreak: adjustedAvgStreak,
        locationCount: LOCATION_COUNT,
        countryCount: COUNTRY_COUNT,
        usersPlayed: explorers.length,
      }

      // const games = await collections.games
      //   ?.aggregate([
      //     { $match: { userId: new ObjectId(userId), mode: 'streak' } },
      //     { $group: { _id: null, max: { $max: '$streak' } } },
      //   ])
      //   .toArray()

      // console.log(games)

      // if (!games || games.length !== 1) {
      //   return throwError(res, 400, 'Could not get your best streak at this time')
      // }

      // const result = {
      //   bestStreak: games[0].max || 0,
      // }

      res.status(200).send(result)
    } else {
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false })
  }
}
