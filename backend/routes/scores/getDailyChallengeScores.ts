import { NextApiRequest, NextApiResponse } from 'next'
import { getQueryLimit, throwError, todayEnd, todayStart, verifyUser } from '@backend/utils'
import getHighscores from '@backend/utils/getHighscores'

const getDailyChallengeScores = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = await verifyUser(req, res)

  const limit = getQueryLimit(req.query.limit, 5)

  const allTimeQuery = { isDailyChallenge: true, state: 'finished' }
  const todayQuery = { isDailyChallenge: true, state: 'finished', createdAt: { $gte: todayStart, $lt: todayEnd } }

  const allTimeScores = await getHighscores(userId, allTimeQuery, limit, 'standard')
  const todayScores = await getHighscores(userId, todayQuery, limit, 'standard')

  if (!allTimeScores || !todayScores) {
    return throwError(res, 404, 'Failed to get daily challenge scores')
  }

  const result = {
    allTime: allTimeScores,
    today: todayScores,
  }

  res.status(200).send(result)
}

export default getDailyChallengeScores
