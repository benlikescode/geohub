import { collections, dbConnect } from '../../../backend/utils/dbConnect'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    if (req.method === 'GET') {
      const userCount = await collections.users?.estimatedDocumentCount()
      const spGamesCount = await collections.games?.estimatedDocumentCount()
      const challengesCount = await collections.challenges?.estimatedDocumentCount()
      const aerialCount = await collections.aerialGames?.estimatedDocumentCount()

     
      
      res.status(200).json({
        success: true, 
        data: {
          users: userCount,
          spGames: spGamesCount,
          challenges: challengesCount,
          aerialGames: aerialCount,
          recentUsers: recentUsers
        }
      })
    }
    else {
      res.status(500).json({ message: 'Invalid request' })
    }
  }
  catch (err) {
    res.status(500).json({ message: 'Something went wrong, please try again later' })
  }
}