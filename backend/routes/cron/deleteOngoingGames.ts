import { NextApiRequest, NextApiResponse } from 'next'
import { collections, monthAgo, throwError } from '@backend/utils'
import { daysAgo } from '@backend/utils/queryDates'

const deleteOngoingGames = async (req: NextApiRequest, res: NextApiResponse) => {
  const deleteResult = await collections.games?.deleteMany({
    state: { $ne: 'finished' },
    createdAt: { $lt: daysAgo(30) },
  })

  if (!deleteResult) {
    return throwError(res, 500, 'Failed to delete ongoing games')
  }

  await collections.analytics?.findOneAndUpdate({}, { $inc: { deletedOngoingGames: deleteResult.deletedCount } })

  res.status(200).send(`Successfully deleted ${deleteResult.deletedCount} games`)
}

export default deleteOngoingGames
