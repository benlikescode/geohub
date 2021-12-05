import { collections, dbConnect } from '../../../backend/utils/dbConnect'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()
    const mapId = req.query.id as string
    const userId = req.query.userId as string
    
    if (req.method === 'GET') {
      const likes = await collections.mapLikes?.countDocuments({ mapId: mapId })
      
      const likedByUser = await collections.mapLikes?.countDocuments({ mapId: mapId, userId: userId }, { limit: 1 })

      const result = {
        numLikes: likes,
        likedByUser: likedByUser
      }

      res.status(200).send(result)
    }
    else if (req.method === 'DELETE') {
      const removedLike = await collections.mapLikes?.deleteMany({ mapId: mapId, userId: userId })

      if (!removedLike) {
        return res.status(400).send(`Failed to remove like from map with id: ${mapId}`)
      }

      return res.status(200).send('Map was successfully unliked')
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