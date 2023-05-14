import { NextApiRequest, NextApiResponse } from 'next'
/* eslint-disable import/no-anonymous-default-export */
import { dbConnect } from '@backend/utils/dbConnect'
import deleteGame from '../../../backend/routes/games/deleteGame'
import getGame from '../../../backend/routes/games/getGame'
import updateGame from '../../../backend/routes/games/updateGame'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    switch (req.method) {
      case 'GET':
        return getGame(req, res)
      case 'PUT':
        return updateGame(req, res)
      case 'DELETE':
        return deleteGame(req, res)
      default:
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false })
  }
}
