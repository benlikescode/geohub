/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next'
import deleteGame from '@backend/routes/games/deleteGame'
import getGame from '@backend/routes/games/getGame'
import updateGame from '@backend/routes/games/updateGame'
import { dbConnect } from '@backend/utils'

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
    console.error(err)
    res.status(500).send({ success: false })
  }
}
