import { NextApiResponse } from 'next'
import NextApiRequestWithSession from '../../types/NextApiRequestWithSession'
import { collections } from '../../utils/dbConnect'
import { throwError } from '../../utils/helpers'
import { dayAgo } from '../../utils/queryDates'

const getDailyChallengeWinners = async (req: NextApiRequestWithSession, res: NextApiResponse) => {
  const games = []
  const challenges = await collections.challenges
    ?.find({ isDailyChallenge: true, createdAt: { $lte: dayAgo } })
    .sort({ createdAt: -1 })
    .limit(7)
    .toArray()

  if (!challenges) {
    return throwError(res, 400, 'Could not find recent challenges')
  }

  for (const challenge of challenges) {
    const gamesData = await collections.games
      ?.aggregate([
        { $match: { challengeId: challenge._id } },
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
            totalPoints: 1,
            totalTime: 1,
            createdAt: 1,
            userId: '$userDetails._id',
            userName: '$userDetails.name',
            userAvatar: '$userDetails.avatar',
          },
        },
      ])
      .toArray()

    if (gamesData && gamesData?.length === 1) {
      games.push(gamesData[0])
    }
  }

  res.status(200).send(games)
}

export default getDailyChallengeWinners
