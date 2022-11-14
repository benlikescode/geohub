import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

import { Game } from '@backend/models'
/* eslint-disable import/no-anonymous-default-export */
import { collections, dbConnect } from '@backend/utils/dbConnect'
import { getAerialLocations } from '@backend/utils/helpers'
import { GuessType } from '@types'
import { getResultData } from '@utils/helperFunctions'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()
    const gameId = req.query.id as string

    if (req.method === 'GET') {
      const query = { _id: new ObjectId(gameId) }
      const game = await collections.aerialGames?.findOne(query)

      if (!game) {
        return res.status(404).send(`Failed to find game with id: ${gameId}`)
      }

      // As of Nov 8, I am querying the user as well so the data can be available when
      // I hit the game end point in the results page (leaderboard)
      // Since this is the main endpoint I am hitting during a game session, it may
      // be worth it to make a seperate endpoint for game results but this should be
      // very minor, so fine for now
      const user = await collections.users?.findOne({ _id: game.userId })

      if (!user) {
        return res.status(404).send(`Failed to find user with id: ${game.userId}`)
      }

      const result = {
        ...game,
        userName: user.name,
        userAvatar: user.avatar,
      }

      res.status(200).send(result)
    } else if (req.method === 'PUT') {
      const query = { _id: new ObjectId(gameId) }
      const { guess, guessTime, localRound, timedOut, timedOutWithGuess, difficulty, countryCode } = req.body

      const game = (await collections.aerialGames?.findOne(query)) as Game

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
          newLocation = await getAerialLocations(difficulty, countryCode)
          duplicate = game.rounds.some((r) => r.lat === newLocation.lat && r.lng === newLocation.lng)
          buffer++
        }

        game.rounds = game.rounds.concat(newLocation)
      }

      // adding new guess
      const { points, distance } = getResultData(guess, game.rounds[game.round - 1], game.mapId)

      const newGuess: GuessType = {
        lat: guess.lat,
        lng: guess.lng,
        points: timedOut && !timedOutWithGuess ? 0 : points,
        distance: distance as number,
        time: Math.floor(guessTime),
        timedOut,
        timedOutWithGuess,
      }
      game.guesses = game.guesses.concat(newGuess)

      game.round++
      game.totalPoints += timedOut && !timedOutWithGuess ? 0 : points
      game.totalDistance += distance as number
      game.totalTime += Math.floor(guessTime)

      const updatedGame = await collections.aerialGames?.findOneAndUpdate(query, { $set: game })

      if (!updatedGame) {
        return res.status(500).send(`Failed to update game with id: ${gameId}`)
      }

      res.status(200).send(game)
    } else if (req.method === 'DELETE') {
      const deletedGame = await collections.aerialGames?.deleteOne({ _id: new ObjectId(gameId) })

      if (!deletedGame) {
        return res.status(400).send(`Failed to delete game with id: ${gameId}`)
      }

      return res.status(200).send('Game was successfully deleted')
    } else {
      res.status(500).json('Nothing to see here.')
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false })
  }
}
