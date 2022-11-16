import { ObjectId } from 'mongodb'
/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next'

import { collections, dbConnect } from '@backend/utils/dbConnect'
import { throwError } from '@backend/utils/helpers'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()
    const mapId = req.query.id as string
    const userId = req.query.userId as string
    const includeStats = req.query.stats as string // true or false

    if (!mapId) {
      return throwError(res, 400, 'You must pass a valid mapId')
    }

    if (req.method === 'GET') {
      // Get Map Details
      let mapDetails = await collections.maps?.findOne({ _id: new ObjectId(mapId) })

      if (!mapDetails) {
        return throwError(res, 404, `Failed to find map with id: ${mapId}`)
      }

      const isOfficialMap = mapDetails.creator === 'GeoHub'

      // If map is user created -> get the user details
      if (!isOfficialMap) {
        const creatorDetails = await collections.users?.findOne({ _id: new ObjectId(mapDetails.creator) })

        if (!creatorDetails) {
          return throwError(res, 404, `Failed to get creator details for map with id: ${mapId}`)
        }

        mapDetails = { ...mapDetails, creatorDetails: { ...creatorDetails, password: null } }
      }

      // If query does not want stats, return early
      if (!includeStats || includeStats === 'false') {
        return res.status(200).send(mapDetails)
      }

      // Get Map's likes and if it's liked by this user
      const likes = await collections.mapLikes?.find({ mapId: new ObjectId(mapId) }).toArray()

      if (!likes) {
        return throwError(res, 404, `Failed to get likes for map with id: ${mapId}`)
      }

      const likedByUser = likes.some((like) => {
        return like.userId.toString() === userId.toString()
      })

      // Get Map's average score
      const avgScore = await collections.games
        ?.aggregate([
          { $match: { mapId: new ObjectId(mapId), round: 6 } },
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

      // Get Map's location count
      const locationCount = await collections.locations?.find({ mapId: new ObjectId(mapId) }).count()

      const result = {
        ...mapDetails,
        likes: {
          numLikes: likes.length,
          likedByUser,
        },
        avgScore: adjustedAvgScore,
        locationCount,
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
