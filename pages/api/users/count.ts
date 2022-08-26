import { collections, dbConnect } from '../../../backend/utils/dbConnect'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    if (req.method === 'GET') {
      const count = await collections.users?.estimatedDocumentCount()

      res.status(200).json({
        success: true, 
        data: {
          count
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