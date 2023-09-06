import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import getMapFromGame from '@backend/queries/getMapFromGame'
import { collections, throwError, verifyUser } from '@backend/utils'
import { ChallengeType } from '@types'

const getChallenge = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await verifyUser(req, res)
  if (!user) return throwError(res, 401, 'Unauthorized')

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

  let playersGame = null

  if (user._id) {
    playersGame = await collections.games?.findOne({
      userId: new ObjectId(user._id),
      challengeId: new ObjectId(challengeId),
    })
  }

  const mapDetails = await getMapFromGame(challenge as ChallengeType)

  if (!mapDetails) {
    return throwError(res, 404, 'Failed to find challenge')
  }

  const challengeBelongsToUser = challenge.creatorId && challenge.creatorId.toString() === user._id

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
