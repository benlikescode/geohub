import { NextApiRequest, NextApiResponse } from 'next'
import { throwError, verifyUser } from '@backend/utils'
import getHighscores from '@backend/utils/getHighscores'
import { objectIdSchema } from '@backend/validations/objectIdSchema'

const getGameScores = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = await verifyUser(req, res)

  const mapId = objectIdSchema.parse(req.query.id)
  const query = { mapId, state: 'finished' }

  const scores = await getHighscores(userId, query, 5, 'standard')

  if (!scores) {
    return throwError(res, 404, 'Failed to get scores for this map')
  }

  res.status(200).send(scores)
}

export default getGameScores
