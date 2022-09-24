import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

import Game from '@backend/models/game'
/* eslint-disable import/no-anonymous-default-export */
import { collections, dbConnect } from '@backend/utils/dbConnect'
import { getLocations, throwError } from '@backend/utils/helpers'
import { getRandomLocation } from '@utils/functions/generateLocations'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    if (req.method === 'POST') {
      const userLocation = req.body.userLocation
      const roundLocation = await getLocations(req.body.mapId)
      const userId = new ObjectId(req.body.userId)

      if (!roundLocation) {
        return throwError(res, 400, 'Failed to get location')
      }

      req.body.userLocation = null

      const newGame = {
        ...req.body,
        mapId: new ObjectId(req.body.mapId),
        userId: userId,
        guesses: [],
        rounds: [roundLocation],
        round: 1,
        totalPoints: 0,
        totalDistance: 0,
        totalTime: 0,
        createdAt: new Date(),
      } as Game

      // check if user has played this map before
      const hasPlayedResult = await collections.games
        ?.find({ userId: userId, mapId: new ObjectId(req.body.mapId) })
        .limit(1)
        .toArray()

      // create game
      const result = await collections.games?.insertOne(newGame)

      if (!result) {
        return res.status(500).send('Failed to create a new game.')
      }

      // if this is users first game, increment usersPlayed for the map
      if (hasPlayedResult?.length === 0) {
        collections.maps?.updateOne({ _id: new ObjectId(req.body.mapId) }, { $inc: { usersPlayed: 1 } })
      }

      res.status(201).send(result.insertedId)
    } else {
      res.status(500).json({ message: 'Invalid request' })
    }
  } catch (err) {
    console.log(err)
    res.status(400).json({ success: false })
  }
}
