import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

import queryTopScores from '@backend/queries/topScores'
/* eslint-disable import/no-anonymous-default-export */
import { dbConnect } from '@backend/utils/dbConnect'
import { throwError } from '@backend/utils/helpers'
import { todayEnd, todayStart } from '@backend/utils/queryDates'

const getScores = async (userId: string, query: any, res: NextApiResponse) => {
  const data = await queryTopScores(query, 5)

  if (!data) {
    return throwError(res, 404, 'Failed to get scores for The Daily Challenge')
  }

  // Determine if this user is in the top 5 (If yes -> mark them as highlight: true)
  const thisUserIndex = data.findIndex((user) => user?.userId?.toString() === userId)
  const isUserInTopFive = thisUserIndex !== -1

  if (isUserInTopFive) {
    data[thisUserIndex] = { ...data[thisUserIndex], highlight: true }
    return data
  }

  // If this user is not in the top 5 -> Get their top score and mark them as highlight: true
  const thisUserQuery = { userId: new ObjectId(userId), ...query }
  const thisUserData = await queryTopScores(thisUserQuery, 1)

  if (thisUserData && thisUserData.length === 1) {
    data.push({ ...thisUserData[0], highlight: true })
  }

  return data
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    if (req.method === 'GET') {
      const userId = req.headers.uid as string

      const allTimeQuery = { isDailyChallenge: true, state: 'finished' }
      const todayQuery = { isDailyChallenge: true, state: 'finished', createdAt: { $gte: todayStart, $lt: todayEnd } }

      const allTimeData = await getScores(userId, allTimeQuery, res)
      const todayData = await getScores(userId, todayQuery, res)

      const result = {
        allTime: allTimeData,
        today: todayData,
      }

      return res.status(200).send(result)
    } else {
      res.status(500).json('Nothing to see here.')
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false })
  }
}
