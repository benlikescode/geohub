import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { collections, compareObjectIds, getUserId } from '@backend/utils'
import { COUNTRY_STREAKS_ID } from '@utils/constants/random'

type TopScore = {
  gameId: ObjectId
  userId: ObjectId
  totalPoints: number
  totalTime: number
  highlight?: boolean
}

const getStreakScores = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = await getUserId(req, res)

  const mapLeaderboard = await collections.mapLeaderboard
    ?.aggregate([
      { $match: { mapId: COUNTRY_STREAKS_ID } },
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
          scores: {
            $push: {
              gameId: '$scores.gameId',
              userId: '$scores.userId',
              streak: '$scores.totalPoints',
              totalTime: '$scores.totalTime',
              userName: '$userDetails.name',
              userAvatar: '$userDetails.avatar',
            },
          },
        },
      },
    ])
    .toArray()

  // No scores yet for this map
  if (!mapLeaderboard?.length) {
    return res.status(200).send([])
  }

  const topScores = mapLeaderboard[0].scores as TopScore[]

  const thisUserIndex = topScores.findIndex((topScore) => compareObjectIds(topScore.userId, userId))
  const isUserInTopFive = thisUserIndex !== -1

  if (isUserInTopFive) {
    topScores[thisUserIndex] = { ...topScores[thisUserIndex], highlight: true }
  } else {
    const usersTopScore = (await collections.games
      ?.aggregate([
        { $match: { mode: 'streak', userId: new ObjectId(userId), state: 'finished' } },
        { $sort: { streak: -1 } },
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
            streak: 1,
            totalTime: 1,
          },
        },
      ])
      .toArray()) as TopScore[]

    if (usersTopScore?.length) {
      topScores.push({ ...usersTopScore[0], highlight: true })
    }
  }

  res.status(200).send(topScores)
}

export default getStreakScores
