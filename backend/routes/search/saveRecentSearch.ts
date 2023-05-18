import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { RecentSearchItem } from '../../../@types'
import { collections } from '../../utils/dbConnect'
import getUserId from '../../utils/getUserId'
import { throwError } from '../../utils/helpers'

const saveRecentSearch = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = await getUserId(req, res)
  const { type, term, searchedUserId, searchedMapId } = req.body

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

  res.status(201).send({ message: 'Recent search successfully saved' })
}

export default saveRecentSearch
