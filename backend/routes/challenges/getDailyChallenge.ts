import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { collections, getUserId, throwError } from '@backend/utils'

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
      avgScore: adjustedAvgScore,
      usersPlayed: explorers.length,
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
