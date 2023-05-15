/* eslint-disable import/no-anonymous-default-export */
import { NextApiResponse } from 'next'
import { dbConnect } from '@backend/utils/dbConnect'
import verifySession from '../../../backend/middlewares/verifySession'
import getRecentlyPlayedMaps from '../../../backend/routes/maps/getRecentlyPlayedMaps'
import NextApiRequestWithSession from '../../../backend/types/NextApiRequestWithSession'

export default async (req: NextApiRequestWithSession, res: NextApiResponse) => {
  try {
    const hasSession = await verifySession(req, res)
    if (!hasSession) return

    await dbConnect()

    switch (req.method) {
      case 'GET':
        return getRecentlyPlayedMaps(req, res)
      default:
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false })
  }
}
