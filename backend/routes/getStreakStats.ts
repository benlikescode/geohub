import { NextApiRequest, NextApiResponse } from 'next'
import { collections } from '../utils/dbConnect'
import { throwError } from '../utils/helpers'

const getStreakStats = async (req: NextApiRequest, res: NextApiResponse) => {
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

  res.status(200).send(result)
}

export default getStreakStats
