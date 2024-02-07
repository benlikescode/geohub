import { NextApiRequest, NextApiResponse } from 'next'
import { collections, throwError } from '@backend/utils'

const getStreakStats = async (req: NextApiRequest, res: NextApiResponse) => {
  const LOCATION_COUNT = 250000
  const COUNTRY_COUNT = 98

  const gameStats = await collections.games
    ?.aggregate([
      { $match: { mode: 'streak', state: 'finished' } },
      {
        $group: {
          _id: null,
          avgStreak: { $avg: '$streak' },
          uniquePlayers: { $addToSet: '$userId' },
        },
      },
      {
        $project: {
          _id: 0,
          avgStreak: 1,
          explorers: { $size: '$uniquePlayers' },
        },
      },
    ])
    .toArray()

  if (!gameStats) {
    return throwError(res, 500, 'Failed to get explorers and average streak')
  }

  const { explorers, avgStreak } = gameStats?.length ? gameStats[0] : { explorers: 0, avgStreak: 0 }
  const roundedAvgStreak = Math.ceil(avgStreak)

  const result = {
    avgStreak: roundedAvgStreak,
    locationCount: LOCATION_COUNT,
    countryCount: COUNTRY_COUNT,
    usersPlayed: explorers,
  }

  res.status(200).send(result)
}

export default getStreakStats
