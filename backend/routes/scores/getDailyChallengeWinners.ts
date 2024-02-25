import { NextApiRequest, NextApiResponse } from 'next'
import { collections, throwError } from '@backend/utils'

const getDailyChallengeWinners = async (req: NextApiRequest, res: NextApiResponse) => {
  const winners = await collections.challenges
    ?.aggregate([
      { $match: { isDailyChallenge: true, winner: { $exists: true } } },
      { $sort: { createdAt: -1 } },
      { $limit: 7 },
      {
        $lookup: {
          from: 'users',
          localField: 'winner.userId',
          foreignField: '_id',
          as: 'userDetails',
        },
      },
      {
        $unwind: '$userDetails',
      },
      {
        $project: {
          _id: 1,
          totalPoints: '$winner.totalPoints',
          totalTime: '$winner.totalTime',
          gameId: '$winner.gameId',
          createdAt: 1,
          userId: '$userDetails._id',
          userName: '$userDetails.name',
          userAvatar: '$userDetails.avatar',
        },
      },
    ])
    .toArray()

  if (!winners) {
    return throwError(res, 400, 'Failed to get recent winners')
  }

  res.status(200).send(winners)
}

export default getDailyChallengeWinners
