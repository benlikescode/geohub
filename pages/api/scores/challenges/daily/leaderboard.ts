/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next'
import { dbConnect } from '@backend/utils/dbConnect'
import getDailyChallengeScores from '../../../../../backend/routes/scores/getDailyChallengeScores'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    switch (req.method) {
      case 'GET':
        return getDailyChallengeScores(req, res)
      default:
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false })
  }
}
