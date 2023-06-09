/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next'
import { collections, dbConnect, throwError } from '@backend/utils'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    if (req.method === 'GET') {
      const page = req.query.page ? Number(req.query.page) : 0
      const mapsPerPage = 28

      const maps = await collections.maps
        ?.find({
          isPublished: true,
          isDeleted: { $exists: false },
          creator: 'GeoHub',
          description: { $ne: '' },
        })
        .skip(page * mapsPerPage)
        .limit(mapsPerPage + 1)
        .toArray()

      if (!maps) {
        return throwError(res, 400, 'Failed to get official maps')
      }

      const data = maps.slice(0, mapsPerPage)
      const hasMore = maps.length > mapsPerPage

      res.status(200).send({
        data,
        hasMore,
      })
    } else {
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false })
  }
}
