/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next'
import deleteCustomMap from '@backend/routes/maps/deleteCustomMap'
import getCustomMap from '@backend/routes/maps/getCustomMap'
import updateCustomMap from '@backend/routes/maps/updateCustomMap'
import { catchErrors, dbConnect } from '@backend/utils'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    switch (req.method) {
      case 'GET':
        await getCustomMap(req, res)
        break
      case 'PUT':
        await updateCustomMap(req, res)
        break
      case 'DELETE':
        await deleteCustomMap(req, res)
        break
      default:
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (err) {
    return catchErrors(res, err)
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
}
