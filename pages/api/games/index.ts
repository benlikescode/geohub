import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

import Game from '@backend/models/game'
/* eslint-disable import/no-anonymous-default-export */
import { collections, dbConnect } from '@backend/utils/dbConnect'
import { getLocations, throwError } from '@backend/utils/helpers'
import { OFFICIAL_WORLD_ID } from '@utils/constants/random'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    if (req.method === 'POST') {
      const { mode, mapId, userId } = req.body

      console.log(mapId)

      const roundLocation = await getLocations(mapId)

      // let roundLocation = null

      // if (mode === 'streak') {
      //   roundLocation = await getLocations('streak')
      // }

      // if (mode === 'standard') {
      //   roundLocation = await getLocations(req.body.mapId)
      // }

      if (!roundLocation) {
        return throwError(res, 400, 'Failed to get location')
      }

      req.body.userLocation = null

      const newGame = {
        ...req.body,
        mapId: mode === 'standard' ? new ObjectId(mapId) : mapId,
        userId: new ObjectId(userId),
        guesses: [],
        rounds: [roundLocation],
        round: 1,
        totalPoints: 0,
        totalDistance: 0,
        totalTime: 0,
        streak: 0,
        state: 'started',
        createdAt: new Date(),
      } as Game

      // create game
      const result = await collections.games?.insertOne(newGame)

      if (!result) {
        return res.status(500).send('Failed to create a new game.')
      }

      res.status(201).send(result.insertedId)
    } else {
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (err) {
    console.log(err)
    res.status(400).json({ success: false })
  }
}
