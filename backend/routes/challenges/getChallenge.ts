import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import getMapFromGame from '@backend/queries/getMapFromGame'
import {
  collections,
  compareObjectIds,
  throwError,
  verifyUser
} from '@backend/utils'
import { ChallengeType } from '@types'

const getChallenge = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = await verifyUser(req, res)
  if (!userId) return throwError(res, 401, 'Unauthorized')

  const challengeId = req.query.id as string
  const challenge = await collections.challenges?.findOne({ _id: new ObjectId(challengeId) })

  if (!challenge) {
    return throwError(res, 404, 'Failed to find challenge')
  }

  // Get user details of challenge creator (if not the daily challenge)
  let challengeCreator = null
  if (!challenge.isDailyChallenge) {
    challengeCreator = await collections.users?.findOne({ _id: challenge.creatorId })

    if (!challengeCreator) {
      return throwError(res, 404, 'Failed to find challenge')
    }
  }

  const playersGame = await collections.games?.findOne({
    userId: new ObjectId(userId),
    challengeId: new ObjectId(challengeId),
  })

  const mapDetails = await getMapFromGame(challenge as ChallengeType)

  if (!mapDetails) {
    return throwError(res, 404, 'Failed to find challenge')
  }

  const challengeBelongsToUser = compareObjectIds(userId, challenge.creatorId)

  const result = {
    ...challenge,
    creatorName: challengeCreator?.name,
    creatorAvatar: challengeCreator?.avatar,
    playersGame,
    mapDetails,
    challengeBelongsToUser,
  }

  res.status(200).send(result)
}

export default getChallenge
