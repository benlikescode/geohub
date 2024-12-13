import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { collections, getUserId, throwError } from '@backend/utils'
import { userProject } from '@backend/utils/dbProjects'
import { COUNTRY_STREAK_DETAILS, COUNTRY_STREAKS_ID } from '@utils/constants/random'
import { GameType } from '@types';

const SENSITIVE_GAME_FIELDS: (keyof GameType)[] = ["guesses", "rounds"]

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
      { $unwind: '$userDetails' },
      { $project: { userDetails: userProject } },
    ])
    .limit(100)
    .toArray()

  if (!gamesData || gamesData.length < 1) {
    return throwError(res, 404, `Failed to get scores for challenged with id: ${challengeId}`)
  }

  let notPlayed = false;

  // If user has not yet played challenge -> they cant see the locations or guesses, only scores and meta info
  if (!gamesData.find((x) => x?.userId?.toString() === userId)) {
    notPlayed = true;
    for (const game of gamesData) {
      for (const field of SENSITIVE_GAME_FIELDS) {
        delete game[field];
      }
    }
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
    notPlayed,
  })
}

export default getChallengeScores
