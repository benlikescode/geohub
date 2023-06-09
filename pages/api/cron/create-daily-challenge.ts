/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next'
import createDailyChallenge from '@backend/routes/challenges/createDailyChallenge'
import { dbConnect } from '@backend/utils'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    createDailyChallenge(req, res)
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false })
  }
}
