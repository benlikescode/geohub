import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { collections, getUserId, throwError } from '@backend/utils'
import compareObjectIds from '@backend/utils/compareObjectIds'

type TopScore = {
  gameId: ObjectId
  userId: ObjectId
  totalPoints: number
  totalTime: number
  highlight?: boolean
}

const getGameScores = async (req: NextApiRequest, res: NextApiResponse) => {
  // res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=60')

  const userId = await getUserId(req, res)
  const mapId = req.query.id as string

  const mapLeaderboard = await collections.mapLeaderboard
    ?.aggregate([
      { $match: { mapId: new ObjectId(mapId) } },
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
    return throwError(res, 404, 'Failed to get scores for this map')
  }

  const topScores = mapLeaderboard[0].scores as TopScore[]

  const thisUserIndex = topScores.findIndex((topScore) => compareObjectIds(topScore.userId, userId))
  const isUserInTopFive = thisUserIndex !== -1

  if (isUserInTopFive) {
    topScores[thisUserIndex] = { ...topScores[thisUserIndex], highlight: true }
  } else {
    const usersTopScore = (await collections.games
      ?.aggregate([
        { $match: { mapId: new ObjectId(mapId), userId: new ObjectId(userId), state: 'finished' } },
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

  res.status(200).send(topScores)
}

export default getGameScores
