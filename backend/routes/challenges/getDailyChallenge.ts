import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { collections, compareObjectIds, getUserId, throwError } from '@backend/utils'
import { DAILY_CHALLENGE_ID } from '@utils/constants/random'

type TopScore = {
  gameId: ObjectId
  userId: ObjectId
  totalPoints: number
  totalTime: number
  highlight?: boolean
}

const LOCATION_COUNT = 250000
const COUNTRY_COUNT = 98

const getDailyChallenge = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = await getUserId(req, res)

  const dailyChallengeQuery = await collections.challenges
    ?.find({ isDailyChallenge: true })
    .sort({ createdAt: -1 })
    .limit(1)
    .toArray()

  if (!dailyChallengeQuery || !dailyChallengeQuery.length) {
    return throwError(res, 500, `Could not find today's challenge`)
  }

  const dailyChallenge = dailyChallengeQuery[0]
  const dailyChallengeId = new ObjectId(dailyChallenge._id)

  // Check if user has already played today's challenge
  const hasAlreadyPlayed = await collections.games?.findOne({
    challengeId: dailyChallengeId,
    userId: new ObjectId(userId),
  })

  const mapLeaderboard = await collections.mapLeaderboard
    ?.aggregate([
      { $match: { mapId: DAILY_CHALLENGE_ID, dailyChallengeId } },
      {
        $unwind: '$scores',
      },
      {
        $lookup: {
          from: 'users',
          localField: 'scores.userId',
          foreignField: '_id',
          as: 'userDetails',
        },
      },
      {
        $unwind: '$userDetails',
      },
      {
        $group: {
          _id: '$_id',
          mapId: { $first: '$mapId' },
          avgScore: { $first: '$avgScore' },
          usersPlayed: { $first: '$usersPlayed' },
          scores: {
            $push: {
              gameId: '$scores.gameId',
              userId: '$scores.userId',
              totalPoints: '$scores.totalPoints',
              totalTime: '$scores.totalTime',
              userName: '$userDetails.name',
              userAvatar: '$userDetails.avatar',
            },
          },
        },
      },
    ])
    .toArray()

  if (!mapLeaderboard?.length) {
    return res.status(200).send({
      stats: {
        avgScore: 0,
        usersPlayed: 0,
        locationCount: LOCATION_COUNT,
        countryCount: COUNTRY_COUNT,
      },
      scores: [],
      challengeId: dailyChallenge._id,
      date: dailyChallenge.createdAt,
      usersGameState: hasAlreadyPlayed ? hasAlreadyPlayed.state : 'notStarted',
    })
  }

  const dailyChallengeStats = mapLeaderboard[0]
  const topScores = dailyChallengeStats.scores as TopScore[]

  const thisUserIndex = topScores.findIndex((topScore) => compareObjectIds(topScore.userId, userId))
  const isUserInTopFive = thisUserIndex !== -1

  if (isUserInTopFive) {
    topScores[thisUserIndex] = { ...topScores[thisUserIndex], highlight: true }
  } else {
    const usersTopScore = (await collections.games
      ?.aggregate([
        { $match: { challengeId: dailyChallengeId, userId: new ObjectId(userId), state: 'finished' } },
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
            _id: '$gameId',
            userId: '$_id',
            userName: '$userDetails.name',
            userAvatar: '$userDetails.avatar',
            totalPoints: 1,
            totalTime: 1,
          },
        },
      ])
      .toArray()) as TopScore[]

    if (usersTopScore?.length) {
      topScores.push({ ...usersTopScore[0], highlight: true })
    }
  }

  res.status(200).send({
    stats: {
      avgScore: dailyChallengeStats.avgScore,
      usersPlayed: dailyChallengeStats.usersPlayed,
      locationCount: LOCATION_COUNT,
      countryCount: COUNTRY_COUNT,
    },
    scores: topScores,
    challengeId: dailyChallenge._id,
    date: dailyChallenge.createdAt,
    usersGameState: hasAlreadyPlayed ? hasAlreadyPlayed.state : 'notStarted',
  })
}

export default getDailyChallenge
