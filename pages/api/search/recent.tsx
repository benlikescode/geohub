import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

import { collections, dbConnect } from '@backend/utils/dbConnect'
import { throwError } from '@backend/utils/helpers'
import { RecentSearchItem } from '@types'

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    // Gets the 5 most recent searches from this user
    if (req.method === 'GET') {
      const userId = req.headers.uid as string

      // if (!userId) {
      //   return throwError(res, 400, 'You must pass a valid userId as a query parameter')
      // }

      const recentSearches = await collections.recentSearches?.findOne({ userId: new ObjectId(userId) })

      if (!recentSearches || !recentSearches.searches) {
        return throwError(res, 400, `Failed to find recent searches for user with id: ${userId}`)
      }

      const getUserDetails = async (userId: ObjectId) => {
        const userDetails = await collections.users?.findOne({ _id: userId })

        if (!userDetails) return null

        const result = {
          _id: userDetails._id,
          name: userDetails.name,
          avatar: userDetails.avatar,
        }

        return result
      }

      const getMapDetails = async (mapId: ObjectId) => {
        const mapDetails = await collections.maps?.findOne({ _id: mapId })

        if (!mapDetails) return null

        const result = {
          _id: mapDetails._id,
          name: mapDetails.name,
          previewImg: mapDetails.previewImg,
        }

        return result
      }

      const result = []

      for (const search of recentSearches.searches) {
        const type = search.type

        if (type === 'term') {
          result.push({ type, term: search.term })
        }

        if (type === 'user') {
          const userDetails = await getUserDetails(search.userId as ObjectId)
          result.push({ type, ...userDetails })
        }

        if (type === 'map') {
          const mapDetails = await getMapDetails(search.mapId as ObjectId)
          result.push({ type, ...mapDetails })
        }
      }

      return res.status(200).send(result)
    }

    // Stores a user's recent search in the DB
    else if (req.method === 'POST') {
      const userId = req.headers.uid as string
      const { type, term, searchedUserId, searchedMapId } = req.body

      //const result = await collections.recentSearches.findOne({ userId: new ObjectId() })

      const newSearchItem: RecentSearchItem = {
        type,
        term,
        userId: searchedUserId ? new ObjectId(searchedUserId) : undefined,
        mapId: searchedMapId ? new ObjectId(searchedMapId) : undefined,
        createdAt: new Date(),
      }

      // Adds the recent search item and keeps only the 5 most recent
      const result = await collections.recentSearches?.findOneAndUpdate(
        { userId: new ObjectId(userId) },
        {
          $setOnInsert: { userId: new ObjectId(userId) },
          $push: {
            searches: {
              $each: [newSearchItem],
              $sort: { createdAt: -1 },
              $slice: 5,
            },
          },
        },
        {
          upsert: true,
        }
      )

      if (!result) {
        return throwError(
          res,
          400,
          `Something went wrong when trying to insert the recent search for user with id: ${userId}`
        )
      }

      return res.status(201).send({ message: 'Recent search successfully saved' })
    } else {
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false })
  }
}
