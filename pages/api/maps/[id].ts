/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next'

import { collections, dbConnect } from '@backend/utils/dbConnect'
import { throwError } from '@backend/utils/helpers'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()
    const mapId = req.query.id as string
    const userId = req.query.userId as string

    if (!mapId) {
      return throwError(res, 400, 'You must pass a valid mapId')
    }

    if (req.method === 'GET') {
      const query = { slug: mapId }

      // Get Map Details
      const mapDetails = await collections.maps?.findOne(query)

      if (!mapDetails) {
        return throwError(res, 404, `Failed to find map with id: ${mapId}`)
      }

      // Get Map's likes and if it's liked by this user
      const likes = await collections.mapLikes?.find({ mapId: mapId }).toArray()

      if (!likes) {
        return throwError(res, 404, `Failed to get likes for map with id: ${mapId}`)
      }

      const likedByUser = likes.some((like) => like.userId === userId)

      // Get Map's average score
      const avgScore = await collections.games
        ?.aggregate([
          { $match: { mapId: mapId, round: 6 } },
          {
            $group: {
              _id: null,
              avgScore: { $avg: '$totalPoints' },
            },
          },
        ])
        .toArray()

      if (!avgScore) {
        return throwError(res, 404, `Failed to get average score for map with id: ${mapId}`)
      }

      const adjustedAvgScore = avgScore.length ? Math.ceil(avgScore[0].avgScore) : 0

      const result = {
        ...mapDetails,
        likes: {
          numLikes: likes.length,
          likedByUser,
        },
        avgScore: adjustedAvgScore,
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
