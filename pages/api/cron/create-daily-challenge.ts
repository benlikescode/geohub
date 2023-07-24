/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next'
import createDailyChallenge from '@backend/routes/challenges/createDailyChallenge'
import { dbConnect, throwError } from '@backend/utils'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || authHeader !== process.env.CRON_SECRET) {
      return throwError(res, 401, 'Unauthorized')
    }

    await dbConnect()

    return createDailyChallenge(req, res)
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false })
  }
}
