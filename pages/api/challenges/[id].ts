/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next'
import createChallengeGame from '@backend/routes/challenges/createChallengeGame'
import getChallenge from '@backend/routes/challenges/getChallenge'
import { dbConnect, throwError } from '@backend/utils'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    switch (req.method) {
      case 'GET':
        return getChallenge(req, res)
      case 'POST':
        return createChallengeGame(req, res)
      default:
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (err) {
    console.error(err)
    return throwError(res, 500, 'An unexpected server error occured')
  }
}
