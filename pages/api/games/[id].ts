import { collections, dbConnect } from '../../../backend/utils/dbConnect'
import { NextApiRequest, NextApiResponse } from 'next'
import { ObjectId } from 'mongodb'
import { Game } from '../../../backend/models'
import { getLocationsFromMapId } from '../../../utils/functions/generateLocations'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()
    const gameId = req.query.id as string

    if (req.method === 'GET') {
      const query = { _id: new ObjectId(gameId) }
      const game = await collections.games?.findOne(query)
      
      if (!game) {
        return res.status(500).send(`Failed to find game with id: ${gameId}`)
      }

      res.status(200).send(game)
    }
    else if (req.method === 'PUT') {
      const query = { _id: new ObjectId(gameId) }

      const updatedGame: Game = req.body
      const newLocation = getLocationsFromMapId(updatedGame.map.id as string, 'handPicked', 1)  
      
      updatedGame.rounds = updatedGame.rounds.concat(newLocation)
      const game = await collections.games?.findOneAndUpdate(query, {$set: updatedGame})

      if (!game) {
        return res.status(500).send(`Failed to update game with id: ${gameId}`)
      }

      res.status(200).send(`Successfully updated game with id: ${gameId}`)
    }
    else {
      res.status(500).json('Nothing to see here.')
    }
  }
  catch (err) {
    console.log(err)
    res.status(400).json({ success: false })
  }
}