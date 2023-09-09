/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next'
import deleteGame from '@backend/routes/games/deleteGame'
import getGame from '@backend/routes/games/getGame'
import updateGame from '@backend/routes/games/updateGame'
import { catchErrors, dbConnect } from '@backend/utils'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    switch (req.method) {
      case 'GET':
        await getGame(req, res)
        break
      case 'PUT':
        await updateGame(req, res)
        break
      case 'DELETE':
        await deleteGame(req, res)
        break
      default:
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (err) {
    return catchErrors(res, err)
  }
}
