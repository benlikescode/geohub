import { NextApiRequest, NextApiResponse } from 'next'
import { collections, throwError } from '@backend/utils'

const resetDailyQuota = async (req: NextApiRequest, res: NextApiResponse) => {
  const resetFlag = collections.featureFlags?.findOneAndUpdate({}, { $set: { mapsQuotaReached: false } })

  if (!resetFlag) {
    return throwError(res, 500, 'Failed to reset map quota flag')
  }

  res.status(200).send('Successfully reset map quota flag')
}

export default resetDailyQuota
