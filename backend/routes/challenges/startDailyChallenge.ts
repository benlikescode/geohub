import { ObjectId } from 'bson'
import { NextApiResponse } from 'next'
import { OFFICIAL_WORLD_ID } from '../../../utils/constants/random'
import NextApiRequestWithSession from '../../types/NextApiRequestWithSession'
import { collections } from '../../utils/dbConnect'
import { getLocations, throwError } from '../../utils/helpers'
import { todayEnd, todayStart } from '../../utils/queryDates'

const startDailyChallenge = async (req: NextApiRequestWithSession, res: NextApiResponse) => {
  const currentChallenge = await collections.challenges?.findOne({
    isDailyChallenge: true,
    createdAt: { $gte: todayStart, $lt: todayEnd },
  })

  // If there is already a daily challenge, check if this user has played it
  if (currentChallenge) {
    return res.status(200).send({ challengeId: currentChallenge._id })
  }

  const locations = await getLocations(OFFICIAL_WORLD_ID, 5)

  const newDailyChallenge = {
    mapId: new ObjectId(OFFICIAL_WORLD_ID),
    createdAt: new Date(),
    isDailyChallenge: true,
    mode: 'standard',
    gameSettings: {
      timeLimit: 180,
      canMove: true,
      canPan: true,
      canZoom: true,
    },
    locations,
  }

  const result = await collections.challenges?.insertOne(newDailyChallenge)

  if (!result) {
    return throwError(res, 400, 'Could not create new daily challenge')
  }

  res.status(201).send({
    challengeId: result?.insertedId,
  })
}

export default startDailyChallenge
