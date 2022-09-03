import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

/* eslint-disable import/no-anonymous-default-export */
import { collections, dbConnect } from '@backend/utils/dbConnect'
import { randomElement } from '@utils/functions/generateLocations'
import cities from '@utils/locations/cities.json'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Generates location from cities array based on difficulty and a country code filter
  const generateLocation = (difficulty: 'Normal' | 'Easy' | 'Challenging', countryCode: string, locations: any[]) => {
    if (countryCode !== '') {
      const locationsFromCountry = locations.filter((location) => location.iso2 === countryCode)
      return randomElement(locationsFromCountry)
    }

    if (difficulty === 'Normal') {
      return locations[Math.floor(Math.random() * 10000)]
    }

    if (difficulty === 'Easy') {
      return locations[Math.floor(Math.random() * 500)]
    }

    return randomElement(locations)
  }

  try {
    await dbConnect()

    if (req.method === 'POST') {
      const { userId, difficulty, countryCode } = req.body
      const uid = new ObjectId(userId)
      const locations = cities as Array<Object>

      const roundLocation = generateLocation(difficulty, countryCode, locations)

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
