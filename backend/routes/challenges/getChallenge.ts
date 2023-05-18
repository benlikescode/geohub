import { ObjectId } from 'bson'
import { NextApiRequest, NextApiResponse } from 'next'
import { collections } from '../../utils/dbConnect'
import getUserId from '../../utils/getUserId'
import { throwError } from '../../utils/helpers'

const getChallenge = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = await getUserId(req, res)
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

  if (userId) {
    playersGame = await collections.games?.findOne({
      userId: new ObjectId(userId),
      challengeId: new ObjectId(challengeId),
    })
  }

  const mapDetails = await collections.maps?.findOne({ _id: challenge.mapId })

  if (!mapDetails) {
    return throwError(res, 404, 'Failed to find challenge')
  }

  const challengeBelongsToUser = userId === challenge.creatorId.toString()

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
