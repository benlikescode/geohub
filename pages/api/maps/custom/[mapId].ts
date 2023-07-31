/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next'
import deleteCustomMap from '@backend/routes/maps/deleteCustomMap'
import getCustomMap from '@backend/routes/maps/getCustomMap'
import updateCustomMap from '@backend/routes/maps/updateCustomMap'
import { dbConnect } from '@backend/utils'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    switch (req.method) {
      case 'GET':
        return getCustomMap(req, res)
      case 'PUT':
        return updateCustomMap(req, res)
      case 'DELETE':
        return deleteCustomMap(req, res)
      default:
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false })
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
}
