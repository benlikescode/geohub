import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { COUNTRY_STREAK_DETAILS, COUNTRY_STREAKS_ID } from '../../../utils/constants/random'
import { collections } from '../../utils/dbConnect'
import getUserId from '../../utils/getUserId'
import { throwError } from '../../utils/helpers'

const getChallengeScores = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = await getUserId(req, res)
  const challengeId = req.query.id as string

  const query = { challengeId: new ObjectId(challengeId), state: 'finished' }

  const gamesData = await collections.games
    ?.aggregate([
      { $match: query },
      { $sort: { totalPoints: -1 } },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'userDetails',
        },
      },
      {
        $unwind: '$userDetails',
      },
    ])
    .limit(100)
    .toArray()

  if (!gamesData || gamesData.length < 1) {
    return throwError(res, 404, `Failed to get scores for challenged with id: ${challengeId}`)
  }

  // If user has not yet played challenge -> they cant see results
  if (!gamesData.find((x) => x?.userId?.toString() === userId)) {
    return throwError(res, 401, `You haven't finished this challenge yet`)
  }

  // Get Map
  const mapId = gamesData[0].mapId

  if (mapId === COUNTRY_STREAKS_ID) {
    return res.status(200).send({ games: gamesData, map: COUNTRY_STREAK_DETAILS })
  }

  const map = await collections.maps?.findOne({ _id: new ObjectId(mapId) })

  if (!map) {
    return throwError(res, 404, `Failed to get map for challenged with id: ${challengeId}`)
  }

  res.status(200).send({
    games: gamesData,
    map,
  })
}

export default getChallengeScores
