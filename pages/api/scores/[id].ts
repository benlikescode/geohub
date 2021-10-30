import { collections, dbConnect } from '../../../backend/utils/dbConnect'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()
    const mapId = req.query.id as string

    if (req.method === 'GET') {
      const query = { mapId: mapId, round: 6 }
      const data = await collections.games?.find(query)
      .sort({totalPoints: -1})
      .project({guesses: 0, rounds: 0})
      .limit(5)
      .toArray()
      
      if (!data) {
        return res.status(404).send(`Failed to find data`)
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