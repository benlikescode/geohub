import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { queryTopScoresWithJoin } from '@backend/queries/topScores'
import { getUserId, throwError, todayEnd, todayStart } from '@backend/utils'

const getScoresHelper = async (
  userId: string | undefined,
  query: any,
  res: NextApiResponse,
  limit: number | undefined
) => {
  const data = await queryTopScoresWithJoin(query, limit ? Math.min(limit, 200) : 5)

  if (!data) {
    return throwError(res, 404, 'Failed to get scores for The Daily Challenge')
  }

  // Determine if this user is in the top list (If yes -> mark them as highlight: true)
  const thisUserIndex = data.findIndex((user) => user?.userId?.toString() === userId)
  const isUserInTopFive = thisUserIndex !== -1

  if (isUserInTopFive) {
    data[thisUserIndex] = { ...data[thisUserIndex], highlight: true }
    return data
  }

  // If this user is not in the top list -> Get their top score and mark them as highlight: true
  const thisUserQuery = { userId: new ObjectId(userId), ...query }
  const thisUserData = await queryTopScoresWithJoin(thisUserQuery, 1)

  if (thisUserData && thisUserData.length === 1) {
    data.push({ ...thisUserData[0], highlight: true })
  }

  return data
}

const getDailyChallengeScores = async (req: NextApiRequest, res: NextApiResponse) => {
  const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined
  const userId = await getUserId(req, res)

  const allTimeQuery = { isDailyChallenge: true, state: 'finished' }
  const todayQuery = { isDailyChallenge: true, state: 'finished', createdAt: { $gte: todayStart, $lt: todayEnd } }

  const allTimeData = await getScoresHelper(userId, allTimeQuery, res, limit)
  const todayData = await getScoresHelper(userId, todayQuery, res, limit)

  const result = {
    allTime: allTimeData,
    today: todayData,
  }

  res.status(200).send(result)
}

export default getDailyChallengeScores
