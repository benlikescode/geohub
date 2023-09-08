import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { throwError, verifyUser } from '@backend/utils'
import getHighscores from '@backend/utils/getHighscores'

const getGameScores = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = await verifyUser(req, res)
  const mapId = req.query.id as string

  const query = { mapId: new ObjectId(mapId), state: 'finished' }

  const scores = await getHighscores(userId, query, 5, 'standard')

  if (!scores) {
    return throwError(res, 404, 'Failed to get scores for this map')
  }

  res.status(200).send(scores)
}

export default getGameScores
