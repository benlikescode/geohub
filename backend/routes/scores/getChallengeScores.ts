import { NextApiRequest, NextApiResponse } from 'next'
import { GameModel } from '@backend/models'
import { collections, compareObjectIds, throwError, verifyUser } from '@backend/utils'
import { userProject } from '@backend/utils/dbProjects'
import { objectIdSchema } from '@backend/validations/objectIdSchema'
import { COUNTRY_STREAK_DETAILS } from '@utils/constants/otherGameModeDetails'

const getChallengeScores = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = await verifyUser(req, res)
  const challengeId = objectIdSchema.parse(req.query.id)

  const gamesData = (await collections.games
    ?.aggregate([
      { $match: { challengeId, state: 'finished' } },
      { $sort: { totalPoints: -1 } },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'userDetails',
        },
      },
      { $unwind: '$userDetails' },
      { $project: { userDetails: userProject } },
    ])
    .limit(100)
    .toArray()) as GameModel[]

  if (!gamesData || gamesData.length < 1) {
    return throwError(res, 404, `Failed to get scores for challenged with id: ${challengeId}`)
  }

  // If user has not yet played challenge -> they cant see results
  if (!gamesData.find((game) => compareObjectIds(userId, game?.userId))) {
    return throwError(res, 401, `You haven't finished this challenge yet`)
  }

  // Get Map
  const { mapId, mode } = gamesData[0]

  if (mode === 'streak') {
    return res.status(200).send({ games: gamesData, map: COUNTRY_STREAK_DETAILS })
  }

  const map = await collections.maps?.findOne({ _id: mapId })

  if (!map) {
    return throwError(res, 404, `Failed to get map for challenged with id: ${challengeId}`)
  }

  res.status(200).send({
    games: gamesData,
    map,
  })
}

export default getChallengeScores
