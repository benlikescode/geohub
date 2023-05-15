/* eslint-disable import/no-anonymous-default-export */
import { NextApiResponse } from 'next'
import { dbConnect } from '@backend/utils/dbConnect'
import verifySession from '../../../../backend/middlewares/verifySession'
import createCustomMap from '../../../../backend/routes/maps/createCustomMap'
import getCustomMaps from '../../../../backend/routes/maps/getCustomMaps'
import NextApiRequestWithSession from '../../../../backend/types/NextApiRequestWithSession'

export default async (req: NextApiRequestWithSession, res: NextApiResponse) => {
  try {
    const hasSession = await verifySession(req, res)
    if (!hasSession) return

    await dbConnect()

    switch (req.method) {
      case 'GET':
        return getCustomMaps(req, res)
      case 'POST':
        return createCustomMap(req, res)
      default:
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false })
  }
}
