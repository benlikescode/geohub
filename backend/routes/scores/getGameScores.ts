import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import queryTopScores from '../../queries/topScores'
import getUserId from '../../utils/getUserId'
import { throwError } from '../../utils/helpers'

const getGameScores = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = await getUserId(req, res)
  const mapId = req.query.id as string

  // Get the top 5 user scores
  const query = { mapId: new ObjectId(mapId), round: 6 }
  const data = await queryTopScores(query, 5)

  if (!data) {
    return throwError(res, 404, 'Failed to get scores for this map')
  }

  // Determine if this user is in the top 5 (If yes -> mark them as highlight: true)
  const thisUserIndex = data.findIndex((user) => user?.userId?.toString() === userId)
  const isUserInTopFive = thisUserIndex !== -1

  if (isUserInTopFive) {
    data[thisUserIndex] = { ...data[thisUserIndex], highlight: true }
    return res.status(200).send(data)
  }

  // If this user is not in the top 5 -> Get their top score and mark them as highlight: true
  const thisUserQuery = { userId: new ObjectId(userId), mapId: new ObjectId(mapId), round: 6 }
  const thisUserData = await queryTopScores(thisUserQuery, 1)

  // If this user has not played the map -> return early
  if (!thisUserData || thisUserData.length !== 1) {
    return res.status(200).send(data)
  }

  data.push({ ...thisUserData[0], highlight: true })

  res.status(200).send(data)
}

export default getGameScores
