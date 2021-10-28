import { collections, dbConnect } from '../../../backend/utils/dbConnect'
import Game from '../../../backend/models/game' 
import { NextApiRequest, NextApiResponse } from 'next'
import { getLocationsFromMapId } from '../../../utils/functions/generateLocations'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    if (req.method === 'POST') {
      const locations = getLocationsFromMapId(req.body.mapId, 'handPicked', 1)
      
      const newGame = {
        ...req.body,
        guesses: [],
        rounds: locations,
        round: 1,
        totalPoints: 0,
        totalDistance: 0
      } as Game

      const result = await collections.games?.insertOne(newGame)

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