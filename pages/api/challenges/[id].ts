import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
/* eslint-disable import/no-anonymous-default-export */
import { collections, dbConnect } from '@backend/utils/dbConnect'
import { throwError } from '@backend/utils/helpers'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()
    const challengeId = req.query.id as string
    const userId = req.headers.uid as string

    if (req.method === 'GET') {
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

      const result = {
        ...challenge,
        creatorName: challengeCreator?.name,
        creatorAvatar: challengeCreator?.avatar,
        playersGame,
        mapDetails,
      }

      res.status(200).send(result)
    }

    // Create a game for a given challenge
    else if (req.method === 'POST') {
      const { mapId, mode, gameSettings, locations, isDailyChallenge } = req.body

      const newGame = {
        mapId: mode === 'standard' ? new ObjectId(mapId) : mapId,
        userId: new ObjectId(userId),
        challengeId: new ObjectId(challengeId),
        mode,
        gameSettings,
        guesses: [],
        rounds: locations,
        round: 1,
        totalPoints: 0,
        totalDistance: 0,
        totalTime: 0,
        streak: 0,
        state: 'started',
        isDailyChallenge,
        createdAt: new Date(),
      }

      // Create game that is associated with this challenge
      const result = await collections.games?.insertOne(newGame)

      if (!result) {
        return throwError(res, 400, 'Failed to create your game in this challenge')
      }

      const id = result.insertedId

      // const mapDetails = await collections.maps?.findOne({ _id: new ObjectId(mapId) })
      const mapDetails = null
      res.status(201).send({ id, ...newGame, mapDetails })
    } else {
      res.status(500).json('Nothing to see here.')
    }
  } catch (err) {
    console.log(err)
    return throwError(res, 500, 'An unexpected server error occured')
  }
}
