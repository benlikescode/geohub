import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { collections, getUserId, throwError } from '@backend/utils'

const getDailyChallenge = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = await getUserId(req, res)

  const gameStats = await collections.games
    ?.aggregate([
      { $match: { isDailyChallenge: true, state: 'finished' } },
      {
        $group: {
          _id: null,
          avgScore: { $avg: '$totalPoints' },
          uniquePlayers: { $addToSet: '$userId' },
        },
      },
      {
        $project: {
          _id: 0,
          avgScore: 1,
          explorers: { $size: '$uniquePlayers' },
        },
      },
    ])
    .toArray()

  if (!gameStats) {
    return throwError(res, 500, 'Failed to get explorers and average score')
  }

  const { explorers, avgScore } = gameStats?.length ? gameStats[0] : { explorers: 0, avgScore: 0 }
  const roundedAvgScore = Math.ceil(avgScore)

  const todaysChallengeQuery = await collections.challenges
    ?.find({ isDailyChallenge: true })
    .sort({ createdAt: -1 })
    .limit(1)
    .toArray()

  if (!todaysChallengeQuery || !todaysChallengeQuery.length) {
    return throwError(res, 500, `Could not find today's challenge`)
  }

  const todaysChallenge = todaysChallengeQuery[0]

  // Check if user has already played today's challenge
  const hasAlreadyPlayed = await collections.games?.findOne({
    challengeId: todaysChallenge._id,
    userId: new ObjectId(userId),
  })

  const result = {
    stats: {
      avgScore: roundedAvgScore,
      usersPlayed: explorers,
      locationCount: 250000,
      countryCount: 98,
    },
    usersGameState: hasAlreadyPlayed ? hasAlreadyPlayed.state : 'notStarted',
    challengeId: todaysChallenge._id,
    date: todaysChallenge.createdAt,
  }

  res.status(200).send(result)
}

export default getDailyChallenge
