/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next'
import createCustomMap from '@backend/routes/maps/createCustomMap'
import getCustomMaps from '@backend/routes/maps/getCustomMaps'
import { catchErrors, dbConnect } from '@backend/utils'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    switch (req.method) {
      case 'GET':
        await getCustomMaps(req, res)
        break
      case 'POST':
        await createCustomMap(req, res)
        break
      default:
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (err) {
    return catchErrors(res, err)
  }
}
