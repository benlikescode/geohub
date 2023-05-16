import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import {
  COUNTRY_STREAK_DETAILS,
  COUNTRY_STREAKS_ID
} from '../../../utils/constants/random'
import { collections } from '../../utils/dbConnect'

const getChallengeScores = async (req: NextApiRequest, res: NextApiResponse) => {
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
    .limit(10)
    .toArray()

  if (!gamesData || gamesData.length < 1) {
    return res.status(404).json(`Failed to get scores for challenged with id: ${challengeId}`)
  }

  // Get Map
  const mapId = gamesData[0].mapId

  if (mapId === COUNTRY_STREAKS_ID) {
    return res.status(200).send({ games: gamesData, map: COUNTRY_STREAK_DETAILS })
  }

  const map = await collections.maps?.findOne({ _id: new ObjectId(mapId) })

  if (!map) {
    return res.status(404).json(`Failed to get map for challenged with id: ${challengeId}`)
  }

  res.status(200).send({
    games: gamesData,
    map,
  })
}

export default getChallengeScores
