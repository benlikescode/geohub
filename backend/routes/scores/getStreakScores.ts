import { NextApiRequest, NextApiResponse } from 'next'
import { throwError, verifyUser } from '@backend/utils'
import getHighscores from '@backend/utils/getHighscores'

const getStreakScores = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = await verifyUser(req, res)

  const query = { mode: 'streak', state: 'finished' }

  const scores = await getHighscores(userId, query, 5, 'streak')

  if (!scores) {
    return throwError(res, 404, 'Failed to get top streaks')
  }

  res.status(200).send(scores)
}

export default getStreakScores
