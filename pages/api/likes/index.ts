/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next'
import getUsersLikedMaps from '@backend/routes/maps/getUsersLikedMaps'
import { catchErrors, dbConnect } from '@backend/utils'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    switch (req.method) {
      case 'GET':
        await getUsersLikedMaps(req, res)
        break
      default:
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (err) {
    return catchErrors(res, err)
  }
}
