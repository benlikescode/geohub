/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next'
import { dbConnect } from '@backend/utils/dbConnect'
import getMapLikeCount from '../../../backend/routes/maps/getMapLikeCount'
import likeMap from '../../../backend/routes/maps/likeMap'
import unlikeMap from '../../../backend/routes/maps/unlikeMap'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    switch (req.method) {
      case 'GET':
        return getMapLikeCount(req, res) // don't believe this is ever called on FE
      case 'POST':
        return likeMap(req, res)
      case 'DELETE':
        return unlikeMap(req, res)
      default:
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false })
  }
}
