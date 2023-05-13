import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { Game } from '@backend/models'
/* eslint-disable import/no-anonymous-default-export */
import { collections, dbConnect } from '@backend/utils/dbConnect'
import { getLocations, throwError } from '@backend/utils/helpers'
import { ChallengeType, GuessType, LocationType } from '@types'
import { getResultData } from '@utils/helperFunctions'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    const gameId = req.query.id as string

    if (req.method === 'GET') {
      if (gameId.length !== 24) {
        return throwError(res, 404, 'Failed to find game')
      }

      const gameQuery = await collections.games
        ?.aggregate([
          { $match: { _id: new ObjectId(gameId) } },
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
          {
            $project: {
              userDetails: {
                password: 0,
              },
            },
          },
        ])
        .toArray()

      if (!gameQuery || gameQuery.length !== 1) {
        return throwError(res, 404, 'Failed to find game')
      }

      const game = gameQuery[0] as Game

      // // Dont expose country code to the FE -> Nvm, need for country streaks
      // COULD hide for regular games if i want, but really who gives af, cheaters gunna cheat
      // const roundsFiltered = game.rounds.map((round) => {
      //   return { ...round, countryCode: null, streakLocationCode: null }
      // })

      res.status(200).send(game)
    }

    // Stores previous round info and gets next round
    else if (req.method === 'PUT') {
      const query = { _id: new ObjectId(gameId) }
      const {
        guess,
        guessTime,
        localRound,
        userLocation,
        timedOut,
        timedOutWithGuess,
        adjustedLocation,
        streakLocationCode,
      } = req.body

      const game = (await collections.games?.findOne(query)) as Game

      if (!game) {
        return throwError(res, 500, 'Failed to save your recent guess')
      }

      // Checking if guess has already been submitted for this round
      if (game.guesses.length === localRound) {
        return throwError(res, 400, 'You have already made a guess for this round. Please refresh your browser')
      }

      // Determine if game is finished
      let isGameFinished = false

      if (game.mode === 'standard') {
        isGameFinished = game.round === 5
      }

      if (game.mode === 'streak') {
        const actualLocation = game.rounds[localRound - 1]

        if (streakLocationCode.toLowerCase() !== actualLocation.countryCode?.toLowerCase()) {
          isGameFinished = true
        } else {
          game.streak++
        }
      }

      game.state = isGameFinished ? 'finished' : 'started'

      // Add new location if game type is not a challenge and game is not finished
      if (!isGameFinished) {
        // Generates new location until unique or 5 failed attempts
        // Note: this does not actually work now since I store the old rounds "adjusted" coordiantes
        // If i really want to prevent duplicates, I will need to come up with some "golden" threshold
        // If i dont have a threshold, there is no point of what I am doing below so commented out for now:

        // let duplicate = true
        // let newLocation: any = null
        // let buffer = 0

        // while (duplicate && buffer < 5) {
        //   // console.log(`ATTEMPT AT GETTING LOC - ${buffer}`)
        //   newLocation = await getLocations(game.mapId)

        //   if (!newLocation) {
        //     return throwError(res, 400, 'Failed to get new location')
        //   }

        //   // const THRESHOLD = 0.001

        //   // duplicate = game.rounds.some(
        //   //   (r) => r.lat - newLocation.lat < THRESHOLD && r.lng - newLocation.lng < THRESHOLD
        //   // )
        //   duplicate = game.rounds.some((r) => r.lat === newLocation.lat && r.lng === newLocation.lng)
        //   buffer++
        // }

        // Country Streak Challenge
        if (game.mode === 'streak' && game.challengeId) {
          const query = { _id: new ObjectId(game.challengeId) }
          const challenge = (await collections.challenges?.findOne(query)) as ChallengeType

          // Need to generate more rounds
          if (localRound + 1 > challenge.locations.length) {
            const newLocations = await getLocations(game.mapId, 10)

            if (!newLocations) {
              return throwError(res, 400, 'Failed to get new location')
            }

            // Add new locations to the challenge document
            challenge.locations = challenge.locations.concat(newLocations)

            const updatedChallenge = await collections.challenges?.findOneAndUpdate(query, { $set: challenge })

            if (!updatedChallenge) {
              return throwError(res, 500, 'Failed to get next round')
            }

            // Add new locations to this user's game document
            game.rounds = game.rounds.concat(newLocations)
          }

          // Updates the previously generated round to the coordinates returned by the Google SV Pano
          if (adjustedLocation) {
            game.rounds[localRound - 1] = adjustedLocation
          }

          game.rounds = challenge.locations
        }

        // Single Player
        if (!game.challengeId) {
          const newLocation = await getLocations(game.mapId)

          console.log(newLocation)

          if (!newLocation) {
            return throwError(res, 400, 'Failed to get new location')
          }

          // Updates the previously generated round to the coordinates returned by the Google SV Pano
          if (adjustedLocation) {
            game.rounds[localRound - 1] = adjustedLocation
          }

          game.rounds = game.rounds.concat(newLocation)
        }
      }

      // Adding new guess
      const { points, distance } = getResultData(guess, game.rounds[game.round - 1], game.mapId)

      const newGuess: GuessType = {
        lat: guess.lat,
        lng: guess.lng,
        points: timedOut && !timedOutWithGuess ? 0 : points,
        distance: distance as number,
        time: Math.floor(guessTime),
        timedOut,
        timedOutWithGuess,
        streakLocationCode,
      }
      game.guesses = game.guesses.concat(newGuess)

      game.round++
      game.totalPoints += timedOut && !timedOutWithGuess ? 0 : points
      game.totalDistance += distance as number
      game.totalTime += Math.floor(guessTime)

      const updatedGame = await collections.games?.findOneAndUpdate(query, { $set: game })

      if (!updatedGame) {
        return throwError(res, 500, 'Failed to save your recent guess')
      }

      res.status(200).send(game)
    }

    // Deletes a specified game
    // TODO: Instead of deleting game -> maybe mark as deleted in DB (so i dont lose round data)
    // I added a basic auth check -> but we still need to add JWTs since verifying with the public userId is not secure
    else if (req.method === 'DELETE') {
      const userId = req.headers.uid as string

      // Ensure user is trying to delete one of their own games
      const game = await collections.games?.findOne({ _id: new ObjectId(gameId) })

      if (!game) {
        return throwError(res, 401, 'The game you are trying to delete could not be found')
      }

      if (game.userId.toString() !== userId) {
        return throwError(res, 401, 'You are not authorized to delete this game')
      }

      // If authorized -> Remove game from DB
      const deletedGame = await collections.games?.deleteOne({ _id: new ObjectId(gameId) })

      if (!deletedGame) {
        return throwError(res, 400, 'An error occured while deleting the game')
      }

      return res.status(200).send({ message: 'The game was successfully deleted' })
    } else {
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false })
  }
}
