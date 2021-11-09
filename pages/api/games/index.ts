import { collections, dbConnect } from '../../../backend/utils/dbConnect'
import Game from '../../../backend/models/game' 
import { NextApiRequest, NextApiResponse } from 'next'
import { getRandomLocation, getRandomLocationsInRadius } from '../../../utils/functions/generateLocations'
import { ObjectId } from 'mongodb'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    if (req.method === 'POST') {
      const userLocation = req.body.userLocation
      const roundLocation = getRandomLocation('handpicked', req.body.mapId, userLocation)
      const userId = new ObjectId(req.body.userId)

      if (roundLocation === null) {
        return res.status(400).send('Invalid Map Id, Game could not be created')
      }

      req.body.userLocation = null
        
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

      // check if user has played this map before
      const hasPlayedQuery = { userId: userId, mapId: req.body.mapId }
      const hasPlayedResult = await collections.games?.find(hasPlayedQuery).limit(1).toArray()

      // create game
      const result = await collections.games?.insertOne(newGame)

      if (!result) {
        return res.status(500).send('Failed to create a new game.')
      }

      // if this is users first game, increment usersPlayed for the map
      if (hasPlayedResult?.length === 0) {
        collections.maps?.updateOne(
          { slug: req.body.mapId, },
          { $inc: { usersPlayed: 1 } }
        )
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