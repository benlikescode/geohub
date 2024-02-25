import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { collections, getUserId, throwError } from '@backend/utils'
import compareObjectIds from '@backend/utils/compareObjectIds'
import { TopScore } from '@backend/models'

type TopScoreType = TopScore & {
  highlight?: boolean
}

const getGameScores = async (req: NextApiRequest, res: NextApiResponse) => {
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

  // No scores yet for this map
  if (!mapLeaderboard?.length) {
    return res.status(200).send([])
  }

  const topScores = mapLeaderboard[0].scores as TopScoreType[]

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
            gameId: '$_id',
            userId: 1,
            userName: '$userDetails.name',
            userAvatar: '$userDetails.avatar',
            totalPoints: 1,
            totalTime: 1,
          },
        },
      ])
      .toArray()) as TopScoreType[]

    if (usersTopScore?.length) {
      topScores.push({ ...usersTopScore[0], highlight: true })
    }
  }

  res.status(200).send(topScores)
}

export default getGameScores
