import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

import { Game } from '@backend/models'
/* eslint-disable import/no-anonymous-default-export */
import { collections, dbConnect } from '@backend/utils/dbConnect'
import { getLocations, throwError } from '@backend/utils/helpers'
import { GuessType } from '@types'
import { getRandomLocation } from '@utils/functions/generateLocations'
import { getResultData } from '@utils/helperFunctions'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    const gameId = req.query.id as string

    if (req.method === 'GET') {
      if (gameId.length !== 24) {
        return res.status(404).send(`Failed to find game with id: ${gameId}`)
      }

      const gameQuery = await collections.games
        ?.aggregate([
          { $match: { _id: new ObjectId(gameId) } },
          {
            $lookup: {
              from: 'maps',
              localField: 'mapId',
              foreignField: '_id',
              as: 'mapDetails',
            },
          },
          {
            $unwind: '$mapDetails',
          },
          {
            $lookup: {
              from: 'users',
              localField: 'userId',
              foreignField: '_id',
              as: 'userDetails',
            },
          },
          {
            $unwind: '$userDetails',
          },
        ])
        .toArray()

      if (!gameQuery || gameQuery.length !== 1) {
        return res.status(404).send(`Failed to find game with id: ${gameId}`)
      }

      const game = gameQuery[0]

      res.status(200).send(game)
    }

    // Stores previous round info and gets next round
    else if (req.method === 'PUT') {
      const query = { _id: new ObjectId(gameId) }
      const { guess, guessTime, localRound, userLocation, timedOut, timedOutWithGuess, adjustedLocation } = req.body

      const game = (await collections.games?.findOne(query)) as Game

      if (!game) {
        return res.status(500).send(`Failed to find game with id: ${gameId}`)
      }

      // checking if guess has already been submitted for this round
      if (game.guesses.length === localRound) {
        return res.status(400).send(`A guess has already been made for round ${game.round}`)
      }

      const isChallengeGamemode = game.hasOwnProperty('challengeId')

      // adding new location to rounds if game is not finished
      if (!isChallengeGamemode && game.rounds.length !== 5) {
        let duplicate = true
        let newLocation: any = null
        let buffer = 0

        // generates new location until unique or 5 failed attempts
        while (duplicate && buffer < 5) {
          newLocation = await getLocations(game.mapId)

          if (!newLocation) {
            return throwError(res, 400, 'Failed to get new location')
          }

          duplicate = game.rounds.some((r) => r.lat === newLocation.lat && r.lng === newLocation.lng)
          buffer++
        }

        // updates the previously generated round to the coordinates returned by the Google SV Pano
        if (adjustedLocation) {
          game.rounds[localRound - 1] = adjustedLocation
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

      const updatedGame = await collections.games?.findOneAndUpdate(query, { $set: game })

      if (!updatedGame) {
        return res.status(500).send(`Failed to update game with id: ${gameId}`)
      }

      res.status(200).send(game)
    }

    // Deletes a specified game
    // TODO: Instead of deleting game -> maybe mark as deleted in DB (so i dont lose round data)
    // THIS ENDPOINT NEEDS AUTH -> check that this game belongs to user making request
    else if (req.method === 'DELETE') {
      const deletedGame = await collections.games?.deleteOne({ _id: new ObjectId(gameId) })

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
