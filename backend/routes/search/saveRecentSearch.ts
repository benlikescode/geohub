import { NextApiRequest, NextApiResponse } from 'next'
import { collections, throwError, verifyUser } from '@backend/utils'
import { saveSearchSchema } from '@backend/validations/searchValidations'

const saveRecentSearch = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = await verifyUser(req, res)
  if (!userId) return throwError(res, 401, 'Unauthorized')

  const { type, term, searchedUserId, searchedMapId } = saveSearchSchema.parse(req.body)

  const newSearchItem = {
    type,
    term,
    userId: searchedUserId,
    mapId: searchedMapId,
    createdAt: new Date(),
  }

  // Adds the recent search item and keeps only the 5 most recent
  await collections.recentSearches?.findOneAndUpdate(
    { userId },
    {
      $setOnInsert: { userId },
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
