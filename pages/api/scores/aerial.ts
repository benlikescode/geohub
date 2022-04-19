/* eslint-disable import/no-anonymous-default-export */
import { collections, dbConnect } from '../../../backend/utils/dbConnect'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    if (req.method === 'GET') {
      const query = { round: 6 }
      const data = await collections.aerialGames?.aggregate([
        { $match: query },
        { $sort: { "totalPoints": -1 } },
        { $project: {
          "rounds": 0,
          "guesses": 0
        }},
        { $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'userDetails'
        }},
      ]).limit(10).toArray()
  
      if (!data) {
        return res.status(404).send(`Failed to find data`)
      }

      // a bit of a "hacky" temp solution as I can not seem to query unqiue userIds in the
      // above aggregate query... so for now query extra documents and remove duplicates
      // in theory this may not return 5 unique user scores even if there is, if the same 
      // users in the top 5 have multiple games with scores in the top 5
      const result: any[] = []
        
      data.forEach(item => {
        const idx = result.findIndex((x: any) => x.userId.toString() === item.userId.toString())
        if (idx <= -1) {
          result.push({
            userId: item.userId,
            userName: item.userDetails[0].name,
            userAvatar: item.userDetails[0].avatar,
            gameId: item._id,
            totalPoints: item.totalPoints,
            difficulty: item.difficulty,
            countryCode: item.countryCode
          })
        }
      })

      const slicedResult = result.slice(0, 5)
      
      res.status(200).send(slicedResult)
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