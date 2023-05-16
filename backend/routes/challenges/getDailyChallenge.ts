import { ObjectId } from 'bson'
import { NextApiRequest, NextApiResponse } from 'next'
import { collections } from '../../utils/dbConnect'
import getUserId from '../../utils/getUserId'
import { throwError } from '../../utils/helpers'
import { todayEnd, todayStart } from '../../utils/queryDates'

const getDailyChallenge = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = await getUserId(req, res)

  // Get average score
  const todaysAvgScore = await collections.games
    ?.aggregate([
      { $match: { isDailyChallenge: true, state: 'finished' } },
      {
        $group: {
          _id: null,
          avgScore: { $avg: '$totalPoints' },
        },
      },
    ])
    .toArray()

  if (!todaysAvgScore) {
    return throwError(res, 404, `Failed to get today's average score`)
  }

  const adjustedAvgScore = todaysAvgScore.length ? Math.ceil(todaysAvgScore[0].avgScore) : 0

  // Get number of explorers
  const explorers = await collections.games
    ?.aggregate([
      { $match: { isDailyChallenge: true, state: 'finished' } },
      {
        $group: {
          _id: '$userId',
        },
      },
    ])
    .toArray()

  if (!explorers) {
    return throwError(res, 400, 'Failed to get the number of explorers')
  }

  // Determine if this user has played today's challenge
  const usersDailyChallenge = await collections.games?.findOne({
    userId: new ObjectId(userId),
    isDailyChallenge: true,
    createdAt: { $gte: todayStart, $lt: todayEnd },
  })

  const result = {
    stats: {
      avgScore: adjustedAvgScore,
      usersPlayed: explorers.length,
      locationCount: 250000,
      countryCount: 98,
    },
    usersGameState: usersDailyChallenge ? usersDailyChallenge.state : 'notStarted',
  }

  res.status(200).send(result)
}

export default getDailyChallenge
