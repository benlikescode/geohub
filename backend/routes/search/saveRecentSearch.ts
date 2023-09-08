import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { collections, throwError, verifyUser } from '@backend/utils'
import { RecentSearchItem } from '@types'

const saveRecentSearch = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = await verifyUser(req, res)
  if (!userId) return throwError(res, 401, 'Unauthorized')

  const { type, term, searchedUserId, searchedMapId } = req.body

  const newSearchItem: RecentSearchItem = {
    type,
    term,
    userId: searchedUserId ? new ObjectId(searchedUserId) : undefined,
    mapId: searchedMapId ? new ObjectId(searchedMapId) : undefined,
    createdAt: new Date(),
  }

  // Adds the recent search item and keeps only the 5 most recent
  await collections.recentSearches?.findOneAndUpdate(
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

  res.status(201).send({ message: 'Recent search successfully saved' })
}

export default saveRecentSearch
