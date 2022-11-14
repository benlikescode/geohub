import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

/* eslint-disable import/no-anonymous-default-export */
import { collections, dbConnect } from '@backend/utils/dbConnect'
import { getLocations, throwError } from '@backend/utils/helpers'
import { URBAN_WORLD_ID } from '@utils/constants/random'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    if (req.method === 'POST') {
      const userId = req.query.userId as string
      const startDate = new Date()
      startDate.setHours(0, 0, 0, 0)

      const endDate = new Date()
      endDate.setHours(23, 59, 59, 999)

      const currentChallenge = await collections.challenges?.findOne({
        isDailyChallenge: true,
        createdAt: { $gte: startDate, $lt: endDate },
      })

      // If there is already a daily challenge, check if this user has played it
      if (currentChallenge) {
        const hasPlayed = await collections.games
          ?.find({ userId: new ObjectId(userId), challengeId: new ObjectId(currentChallenge._id) })
          .toArray()

        return res.status(200).send({
          hasPlayed: hasPlayed && hasPlayed.length > 0,
          challengeId: currentChallenge._id,
        })
      }

      const locations = await getLocations(URBAN_WORLD_ID, 5)

      const newDailyChallenge = {
        locations,
        createdAt: new Date(),
        isDailyChallenge: true,
        gameSettings: {
          timeLimit: 0,
          canMove: true,
          canPan: true,
          canZoom: true,
        },
      }

      const result = await collections.challenges?.insertOne(newDailyChallenge)

      if (!result) {
        throwError(res, 400, 'Could not create new daily challenge')
      }

      res.status(201).send({
        hasPlayed: false,
        challengeId: result?.insertedId,
      })
    } else {
      res.status(500).json({ message: 'Invalid request' })
    }
  } catch (err) {
    console.log(err)
    res.status(400).json({ success: false })
  }
}
