import { NextApiRequest, NextApiResponse } from 'next'
import { ChallengeModel } from '@backend/models'
import { collections, compareObjectIds, getMapFromGame, throwError, verifyUser } from '@backend/utils'
import { objectIdSchema } from '@backend/validations/objectIdSchema'

const getChallenge = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = await verifyUser(req, res)
  if (!userId) return throwError(res, 401, 'Unauthorized')

  const challengeId = objectIdSchema.parse(req.query.id)
  const challenge = (await collections.challenges?.findOne({ _id: challengeId })) as ChallengeModel

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

  const playersGame = await collections.games?.findOne({ userId, challengeId })

  const mapDetails = await getMapFromGame(challenge)

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
