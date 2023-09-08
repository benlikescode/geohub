import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import queryTopStreaks from '@backend/queries/topStreaks'
import { throwError, verifyUser } from '@backend/utils'

const getStreakScores = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = await verifyUser(req, res)

  // Get the top 5 user streaks
  const query = { mode: 'streak', state: 'finished' }
  const data = await queryTopStreaks(query, 5)

  if (!data) {
    return throwError(res, 404, 'Failed to get top streaks')
  }

  // Determine if this user is in the top 5 (If yes -> mark them as highlight: true)
  const thisUserIndex = data.findIndex((user) => user?.userId?.toString() === userId)
  const isUserInTopFive = thisUserIndex !== -1

  if (isUserInTopFive) {
    data[thisUserIndex] = { ...data[thisUserIndex], highlight: true }
    return res.status(200).send(data)
  }

  // If user is not signed in -> return early
  if (!userId) {
    return res.status(200).send(data)
  }

  // If this user is not in the top 5 -> Get their top score and mark them as highlight: true
  const thisUserQuery = { userId: new ObjectId(userId), mode: 'streak', state: 'finished' }
  const thisUserData = await queryTopStreaks(thisUserQuery, 1)

  // If this user has not played the map -> return early
  if (!thisUserData || thisUserData.length !== 1) {
    return res.status(200).send(data)
  }

  data.push({ ...thisUserData[0], highlight: true })

  res.status(200).send(data)
}

export default getStreakScores
