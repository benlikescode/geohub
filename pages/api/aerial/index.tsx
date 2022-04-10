/* eslint-disable import/no-anonymous-default-export */
import { collections, dbConnect } from '../../../backend/utils/dbConnect'
import Game from '../../../backend/models/game' 
import { NextApiRequest, NextApiResponse } from 'next'
import { randomElement } from '../../../utils/functions/generateLocations'
import { ObjectId } from 'mongodb'
import * as cities from '../../../utils/locations/cities.json'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    if (req.method === 'POST') {
      const userId = new ObjectId(req.body.userId)
      const roundLocation = randomElement(cities as any[])

      if (roundLocation === null) {
        return res.status(400).send('Round could not be generated')
      }
        
      const newGame = {
        ...req.body,
        userId: userId,
        guesses: [],
        rounds: [roundLocation],
        round: 1,
        totalPoints: 0,
        totalDistance: 0,
        totalTime: 0    
      } as Game

      // create game
      const result = await collections.aerialGames?.insertOne(newGame)

      if (!result) {
        return res.status(500).send('Failed to create a new game.')
      }

      res.status(201).send(result.insertedId)
    }
    else {
      res.status(500).json({ message: 'Invalid request' })
    }
  }
  catch (err) {
    console.log(err)
    res.status(400).json({ success: false })
  }
}