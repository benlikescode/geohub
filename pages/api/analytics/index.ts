/* eslint-disable import/no-anonymous-default-export */
import { collections, dbConnect } from '@backend/utils/dbConnect'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    if (req.method === 'GET') {
      // Chore: Add server side admin check instead of client side
      const userCount = await collections.users?.estimatedDocumentCount()
      const spGamesCount = await collections.games?.estimatedDocumentCount()
      const challengesCount = await collections.challenges?.estimatedDocumentCount()
      const aerialCount = await collections.aerialGames?.estimatedDocumentCount()

      const dateQuery = new Date()
      dateQuery.setMonth(dateQuery.getMonth() - 1)

      const recentUsers = await collections.users
        ?.find({
          createdAt: { $gt: dateQuery },
        })
        .project({ password: 0 })
        .toArray()

      res.status(200).json({
        success: true,
        data: {
          counts: [
            { title: 'Users', count: userCount },
            { title: 'Single Player Games', count: spGamesCount },
            { title: 'Challenges', count: challengesCount },
            { title: 'Aerial Games', count: aerialCount },
          ],
          recentUsers,
        },
      })
    } else {
      res.status(500).json({ message: 'Invalid request' })
    }
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong, please try again later' })
  }
}
