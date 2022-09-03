import { collections, dbConnect } from '@backend/utils/dbConnect'
import { NextApiRequest, NextApiResponse } from 'next'
import { ObjectId } from 'mongodb'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()
    const userId = req.query.userId as string
    const count = Number(req.query.count as string)

    if (req.method === 'GET') {
      const query = { userId: new ObjectId(userId), round: { $ne: 6 } }
      const games = await collections.games
        ?.aggregate([
          { $match: query },
          {
            $project: {
              rounds: 0,
              guesses: 0,
            },
          },
          {
            $lookup: {
              from: 'maps',
              localField: 'mapId',
              foreignField: 'slug',
              as: 'mapDetails',
            },
          },
        ])
        .limit(count || 10)
        .toArray()

      if (!games) {
        return res.status(400).send(`Failed to get unfinished games of user with id: ${userId}`)
      }

      res.status(200).send(games)
    } else if (req.method === 'DELETE') {
    } else {
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false })
  }
}
