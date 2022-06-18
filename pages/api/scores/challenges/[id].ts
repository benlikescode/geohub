/* eslint-disable import/no-anonymous-default-export */
import { collections, dbConnect } from '../../../../backend/utils/dbConnect'
import { NextApiRequest, NextApiResponse } from 'next'
import { ObjectId } from 'mongodb'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()
    const challengeId = req.query.id as string
    const challengeObjectId = new ObjectId(challengeId)

    if (req.method === 'GET') {
      const query = { challengeId: challengeObjectId, round: { $gte: 6 } } // gte: 6 means game is finished
      const gamesData = await collections.games
        ?.aggregate([
          { $match: query },
          { $sort: { totalPoints: -1 } },
          {
            $lookup: {
              from: 'users',
              localField: 'userId',
              foreignField: '_id',
              as: 'userDetails',
            },
          },
        ])
        .limit(10)
        .toArray()

      if (!gamesData || gamesData.length < 1) {
        return res.status(404).json(`Failed to get scores for challenged with id: ${challengeId}`)
      }

      // Get Map
      const mapId = gamesData[0].mapId
      const map = await collections.maps?.findOne({ slug: mapId })

      if (!map) {
        return res.status(404).json(`Failed to get map for challenged with id: ${challengeId}`)
      }

      const result = {
        games: gamesData,
        map,
      }

      res.status(200).send(result)
    } else {
      res.status(500).json('Nothing to see here.')
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false })
  }
}
