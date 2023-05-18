/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next'
import { dbConnect } from '@backend/utils/dbConnect'
import getDailyChallenge from '../../../backend/routes/challenges/getDailyChallenge'
import startDailyChallenge from '../../../backend/routes/challenges/startDailyChallenge'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    switch (req.method) {
      case 'GET':
        return getDailyChallenge(req, res)
      case 'POST':
        return startDailyChallenge(req, res)
      default:
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false })
  }
}
