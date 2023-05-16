/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next'
import { dbConnect } from '@backend/utils/dbConnect'
import { throwError } from '@backend/utils/helpers'
import createChallengeGame from '../../../backend/routes/challenges/createChallengeGame'
import getChallenge from '../../../backend/routes/challenges/getChallenge'

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
