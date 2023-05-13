import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

/* eslint-disable import/no-anonymous-default-export */
import { collections, dbConnect } from '@backend/utils/dbConnect'
import { getLocations, throwError } from '@backend/utils/helpers'
import { todayEnd, todayStart } from '@backend/utils/queryDates'
import { DAILY_CHALLENGE_ID, OFFICIAL_WORLD_ID } from '@utils/constants/random'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()
    const userId = req.headers.uid as string

    if (req.method === 'GET') {
      const dailyChallengeMapDetails = await collections.maps?.findOne({ _id: new ObjectId(DAILY_CHALLENGE_ID) })

      if (!dailyChallengeMapDetails) {
        return throwError(res, 400, 'Could not get details for the Daily Challenge')
      }

      // Get average score
      const todaysAvgScore = await collections.games
        ?.aggregate([
          { $match: { isDailyChallenge: true, state: 'finished' } },
          {
            $group: {
              _id: null,
              avgScore: { $avg: '$totalPoints' },
            },
          },
        ])
        .toArray()

      if (!todaysAvgScore) {
        return throwError(res, 404, `Failed to get today's average score`)
      }

      const adjustedAvgScore = todaysAvgScore.length ? Math.ceil(todaysAvgScore[0].avgScore) : 0

      // Get number of explorers
      const explorers = await collections.games
        ?.aggregate([
          { $match: { isDailyChallenge: true, state: 'finished' } },
          {
            $group: {
              _id: '$userId',
            },
          },
        ])
        .toArray()

      if (!explorers) {
        return throwError(res, 400, 'Failed to get the number of explorers')
      }

      // Determine if this user has played today's challenge
      const usersDailyChallenge = await collections.games?.findOne({
        userId: new ObjectId(userId),
        isDailyChallenge: true,
        createdAt: { $gte: todayStart, $lt: todayEnd },
      })

      const result = {
        details: dailyChallengeMapDetails,
        stats: {
          avgScore: adjustedAvgScore,
          usersPlayed: explorers.length,
          locationCount: 250000,
          countryCount: 98,
        },
        usersGameState: usersDailyChallenge ? usersDailyChallenge.state : 'notStarted',
      }

      res.status(200).send(result)
    }

    //
    else if (req.method === 'POST') {
      const currentChallenge = await collections.challenges?.findOne({
        isDailyChallenge: true,
        createdAt: { $gte: todayStart, $lt: todayEnd },
      })

      // If there is already a daily challenge, check if this user has played it
      if (currentChallenge) {
        // const usersDailyChallenge = await collections.games?.findOne({
        //   userId: new ObjectId(userId),
        //   challengeId: new ObjectId(currentChallenge._id),
        // })

        return res.status(200).send({
          // gameState: usersDailyChallenge ? usersDailyChallenge.state : 'notStarted',
          challengeId: currentChallenge._id,
        })
      }

      const locations = await getLocations(OFFICIAL_WORLD_ID, 5)

      const newDailyChallenge = {
        mapId: new ObjectId(DAILY_CHALLENGE_ID),
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
    } else {
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (err) {
    console.log(err)
    res.status(400).json({ success: false })
  }
}
