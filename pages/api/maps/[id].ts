import { collections, dbConnect } from '../../../backend/utils/dbConnect'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()
    const mapId = req.query.id as string

    if (req.method === 'GET') {
      const query = { slug: mapId }
      const data = await collections.maps?.findOne(query)
       
      if (!data) {
        return res.status(404).send(`Failed to find map with id: ${mapId}`)
      }

      res.status(200).send(data)
    }

    else {
      res.status(500).json('Nothing to see here.')
    }
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ success: false })
  }
}