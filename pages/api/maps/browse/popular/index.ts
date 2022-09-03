/* eslint-disable import/no-anonymous-default-export */
import { collections, dbConnect } from '@backend/utils/dbConnect'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()
    const countQuery = req.query.count as string
    const mapCount = Number(countQuery)
    const mapId = req.query.mapId as string

    if (req.method === 'GET') {
      const maps = await collections.maps
        ?.find({ likes: { $gte: 0 }, slug: { $ne: mapId } })
        .limit(mapCount || 3)
        .toArray()

      if (!maps) {
        return res.status(400).send(`Failed to get maps`)
      }

      res.status(200).send(maps)
    } else {
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false })
  }
}
