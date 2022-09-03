import { NextApiRequest, NextApiResponse } from 'next'

import { collections, dbConnect } from '@backend/utils/dbConnect'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    if (req.method === 'POST') {
      const { userId, startTime, difficulty } = req.body
      const data = { userId, startTime, difficulty }
      const result = await collections.bingoGames?.insertOne(data)

      if (!result) {
        return res.status(500).send('Failed to create Bingo Game')
      }

      res.status(200).send(result.insertedId)
    } else {
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false })
  }
}
