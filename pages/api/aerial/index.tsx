import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

/* eslint-disable import/no-anonymous-default-export */
import { collections, dbConnect } from '@backend/utils/dbConnect'
import { getAerialLocations } from '@backend/utils/helpers'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    if (req.method === 'POST') {
      const { userId, difficulty, countryCode } = req.body
      const uid = new ObjectId(userId)

      const roundLocation = getAerialLocations(difficulty, countryCode)

      if (roundLocation === null) {
        return res.status(400).send('Round could not be generated')
      }

      const newGame = {
        userId: uid,
        guesses: [],
        rounds: [roundLocation],
        round: 1,
        totalPoints: 0,
        totalDistance: 0,
        difficulty,
        countryCode,
      }

      // create game
      const result = await collections.aerialGames?.insertOne(newGame)

      if (!result) {
        return res.status(500).send('Failed to create a new game.')
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
