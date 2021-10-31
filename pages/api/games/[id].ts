import { collections, dbConnect } from '../../../backend/utils/dbConnect'
import { NextApiRequest, NextApiResponse } from 'next'
import { ObjectId } from 'mongodb'
import { Game } from '../../../backend/models'
import { getRandomLocation } from '../../../utils/functions/generateLocations'
import { GuessType, LocationType } from '../../../types'
import { getResultData } from '../../../utils/helperFunctions'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()
    const gameId = req.query.id as string

    if (req.method === 'GET') {
      const query = { _id: new ObjectId(gameId) }
      const game = await collections.games?.findOne(query)
      
      if (!game) {
        return res.status(404).send(`Failed to find game with id: ${gameId}`)
      }

      res.status(200).send(game)
    }


    else if (req.method === 'PUT') {
      const query = { _id: new ObjectId(gameId) }
      const { guess, localRound } = req.body

      const game = await collections.games?.findOne(query) as Game
      
      if (!game) {
        return res.status(500).send(`Failed to find game with id: ${gameId}`)
      }

      // checking if guess has already been submitted for this round 
      if (game.guesses.length === localRound) {
        return res.status(400).send(`A guess has already been made for round ${game.round}`)
      }

      // adding new location to rounds if game is not finished
      if (game.rounds.length !== 5) {
        let duplicate = true
        let newLocation: any = null
        let buffer = 0

        // generates new location until unique or 5 failed attempts
        while (duplicate && buffer < 5) {
          newLocation = getRandomLocation('handpicked', game.mapId)
          duplicate = game.rounds.some(r => r.lat === newLocation.lat && r.lng === newLocation.lng)
          buffer++
        }

        game.rounds = game.rounds.concat(newLocation)
      }
      
      // adding new guess
      const { points, distance } = getResultData(guess, game.rounds[game.round - 1])

      const newGuess: GuessType = {
        lat: guess.lat,
        lng: guess.lng,
        points: points, 
        distance: distance as number
      }
      game.guesses = game.guesses.concat(newGuess)

      game.round++
      game.totalPoints += points
      game.totalDistance += distance as number

      const updatedGame = await collections.games?.findOneAndUpdate(query, {$set: game})

      if (!updatedGame) {
        return res.status(500).send(`Failed to update game with id: ${gameId}`)
      }

      res.status(200).send(game)
    }


    else {
      res.status(500).json('Nothing to see here.')
    }
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ success: false })
  }
}