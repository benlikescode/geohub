import { collections, dbConnect } from '../../../backend/utils/dbConnect'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()
   
    if (req.method === 'POST') {
      const { user, suggestion1, suggestion2 } = req.body
      const data = { user, suggestion1, suggestion2 }
      const result = await collections.bingoSuggestions?.insertOne(data)

      if (!result) {
        return res.status(500).send('Failed to submit suggestion')
      }

      res.status(200).send(result.insertedId)
    }

    else {
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ success: false })
  }
}