import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import queryTopScores from '@backend/queries/topScores'
import { collections, getUserId, throwError } from '@backend/utils'

const getGameScores = async (req: NextApiRequest, res: NextApiResponse) => {
  // res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=60')

  const userId = await getUserId(req, res)
  const mapId = req.query.id as string

  const mapLeaderboard = await collections.mapLeaderboard?.findOne({ mapId: new ObjectId(mapId) })
  const topScores = mapLeaderboard?.scores as any[] // UPDATE THIS TYPE

  if (!topScores) {
    return throwError(res, 404, 'Failed to get scores for this map')
  }

  // Determine if this user is in the top 5 (If yes -> mark them as highlight: true)
  const thisUserIndex = topScores.findIndex((user) => user?.userId?.toString() === userId)
  const isUserInTopFive = thisUserIndex !== -1

  if (isUserInTopFive) {
    topScores[thisUserIndex] = { ...topScores[thisUserIndex], highlight: true }
    return res.status(200).send(topScores)
  }

  // If this user is not in the top 5 -> Get their top score and mark them as highlight: true
  const thisUserQuery = { userId: new ObjectId(userId), mapId: new ObjectId(mapId), round: 6 }
  const thisUsertopScores = await queryTopScores(thisUserQuery, 1)

  // If this user has not played the map -> return early
  if (!thisUsertopScores || thisUsertopScores.length !== 1) {
    return res.status(200).send(topScores)
  }

  topScores.push({ ...thisUsertopScores[0], highlight: true })

  res.status(200).send(topScores)
}

export default getGameScores
