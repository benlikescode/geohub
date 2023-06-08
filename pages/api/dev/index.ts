import fs from 'fs'
/* eslint-disable import/no-anonymous-default-export */
import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { collections, dbConnect } from '@backend/utils/dbConnect'
import { throwError } from '@backend/utils/helpers'
import { bbox, featureCollection, point } from '@turf/turf'
import { BACKGROUND_COLORS, EMOJIS } from '@utils/constants/avatarOptions'
import countryBounds from '@utils/constants/countryBounds.json'
import { randomElement, randomInt } from '@utils/functions/generateLocations'
import { calculateDistance, getRandomAvatar } from '@utils/helpers'
import { GuessType, LocationType } from '../../../@types'

// This endpoint is used soley for testing during development
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    if (process.env.NODE_ENV === 'production') {
      return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    // const getOfficial = () => {
    //   const random = randomInt(1, 35)

    //   return `official${random}.jpg`
    // }

    // const getCustom = () => {
    //   const random = randomInt(1, 17)

    //   return `custom${random}.jpg`
    // }

    if (req.method === 'POST') {
      const kmToMiles = (km: number) => {
        const miles = km * 0.62137119
        return miles
      }

      const games = await collections.games?.find({ totalDistance: { $not: { $type: 3 } } }).toArray()

      if (!games) return throwError(res, 400, 'problem getting all games')

      // First update totalDistances
      for (const game of games) {
        const miles = kmToMiles(game.totalDistance)

        const newTotalDistance = {
          metric: game.totalDistance,
          imperial: miles,
        }

        game.totalDistance = newTotalDistance

        // Update guess distances now
        const guesses = game.guesses

        const newGuesses = []

        for (const guess of guesses) {
          if (typeof guess.distance === 'number') {
            const miles = kmToMiles(guess.distance)

            const newDistance = {
              metric: guess.distance,
              imperial: miles,
            }

            guess.distance = newDistance
          }

          newGuesses.push(guess)
        }

        game.guesses = newGuesses

        // UPDATE GAME IN DB

        const updatedGame = await collections.games?.findOneAndUpdate({ _id: game._id }, { $set: game })

        if (!updatedGame) {
          return throwError(res, 500, `Failed to update game with id: ${game._id}`)
        }
      }

      return res.status(200).send('ALL GOOD!')

      // const maps = await collections.maps?.find({}).toArray()

      // if (!maps) return throwError(res, 400, 'couldnt get maps')

      // for (const map of maps) {
      //   const locationCollection = map.creator === 'GeoHub' ? 'locations' : 'userLocations'

      //   // Get random locations from DB
      //   const locations = await collections[locationCollection]
      //     ?.aggregate([{ $match: { mapId: new ObjectId(map._id) } }])
      //     .toArray()

      //   if (!locations) return throwError(res, 400, 'couldnt get locations')

      //   const c = locations.map((x) => [x.lng, x.lat])

      //   console.log(c.length)

      //   // // Remove outliers
      //   // let lats = c.map((coord) => coord[1])
      //   // let lngs = c.map((coord) => coord[0])

      //   // // Calculate IQR for latitudes and longitudes
      //   // let q1Lat = lats[Math.floor(lats.length / 4)]
      //   // let q3Lat = lats[Math.floor((lats.length * 3) / 4)]
      //   // let iqrLat = q3Lat - q1Lat

      //   // let q1Lng = lngs[Math.floor(lngs.length / 4)]
      //   // let q3Lng = lngs[Math.floor((lngs.length * 3) / 4)]
      //   // let iqrLng = q3Lng - q1Lng

      //   // // Define lower and upper bounds for latitudes and longitudes
      //   // let lowerBoundLat = Math.min(q1Lat - 1.5 * iqrLat, q3Lat + 1.5 * iqrLat)
      //   // let upperBoundLat = Math.max(q1Lat - 1.5 * iqrLat, q3Lat + 1.5 * iqrLat)

      //   // let lowerBoundLng = Math.min(q1Lng - 1.5 * iqrLng, q3Lng + 1.5 * iqrLng)
      //   // let upperBoundLng = Math.max(q1Lng - 1.5 * iqrLng, q3Lng + 1.5 * iqrLng)

      //   // console.log(lowerBoundLat, upperBoundLat, lowerBoundLng, upperBoundLng)

      //   // // Filter out the outliers
      //   // let filteredCoordinates = c.filter(
      //   //   (coord) =>
      //   //     coord[0] >= lowerBoundLng &&
      //   //     coord[0] <= upperBoundLng &&
      //   //     coord[1] >= lowerBoundLat &&
      //   //     coord[1] <= upperBoundLat
      //   // )

      //   // console.log(filteredCoordinates.length)

      //   // Convert the filtered coordinates to turf.js points
      //   let points = c.map((coord) => point(coord))

      //   // Create a feature collection and calculate bounding box
      //   let fc = featureCollection(points)
      //   let box = bbox(fc)

      //   console.log(box[0])
      //   const c1 = { lat: box[1], lng: box[0] } as GuessType
      //   const c2 = { lat: box[3], lng: box[2] } as LocationType
      //   const distance = calculateDistance(c1, c2, 'metric')
      //   console.log(distance)

      //   const scoreFactor = (2000 * Number(distance)) / 18150

      //   const updateMap = await collections.maps?.updateOne({ _id: map._id }, { $set: { scoreFactor: scoreFactor } })

      //   if (!updateMap) return throwError(res, 400, 'issue updating')
      // }
      // return res.status(200).send('SUCCESS')

      // const removeOutliers = (values: any) => {
      //   values.sort((a: any, b: any) => a - b)

      //   let q1 = values[Math.floor(values.length / 4)]
      //   let q3 = values[Math.floor(values.length * (3 / 4))]
      //   let iqr = q3 - q1
      //   let val1 = q1 - 1.5 * iqr
      //   let val2 = q3 + 1.5 * iqr

      //   const minVal = Math.min(val1, val2)
      //   const maxVal = Math.max(val1, val2)

      //   return values.filter((x: any) => x >= minVal && x <= maxVal)
      // }

      // // Step 1: Separate latitudes and longitudes
      // let lats = coordinates.map((coord) => coord[0])
      // let longs = coordinates.map((coord) => coord[1])

      // // Step 2: Calculate IQR and remove outliers
      // lats = removeOutliers(lats)
      // console.log(lats)
      // longs = removeOutliers(longs)

      // // Step 3: Calculate bbox using turf
      // const filteredCoordinates: any[] = lats.map((lat, i) => [lat, longs[i]])
      // const poly = featureCollection(filteredCoordinates)
      // const box = bbox(poly)

      // [
      //   -165.40765955251146,
      //   18.93979491418566,
      //   -3.4684649,
      //   70.22676601279515
      // ]

      // //UPDATES ALL LOCATIONS MISSING A MAPID WITH A SPECIFIED MAPID
      // const result = await collections.userLocations?.updateMany(
      //   { mapId: null },
      //   { $set: { mapId: new ObjectId('64606c961a8cba2359cbe781') } }
      // )

      // return res.status(200).send(result?.modifiedCount)

      // const test = await collections.challenges?.updateMany(
      //   { mapId: new ObjectId('63349eb5090804522c2180b7') },
      //   { $set: { mapId: new ObjectId('6185df7a7b54baf63473a53e') } }
      // )

      // if (!test) return throwError(res, 400, 'ISSUE')

      // return res.status(200).send(test.modifiedCount)

      // const updateLoc = await collections.locations?.updateMany({ countryCode: 'hk' }, { $set: { countryCode: 'cn' } })

      // if (!updateLoc) return throwError(res, 400, 'issue')

      // return res.status(200).send('bye bye hong kong')

      // const officialMaps = await collections.maps?.find({ creator: { $eq: 'GeoHub' } }).toArray()

      // if (!officialMaps) return throwError(res, 400, 'messed up official')
      // let i = 1
      // for (const map of officialMaps) {
      //   if (i === 35) {
      //     i = 1
      //   }

      //   const updateMap = await collections.maps?.updateOne(
      //     { _id: map._id },
      //     { $set: { previewImg: `official${i}.jpg` } }
      //   )

      //   if (!updateMap) {
      //     return throwError(res, 400, 'messed up updating official')
      //   }

      //   i++
      // }

      // return res.status(200).send('ALL GOOD G')

      // const result = await collections.maps?.updateMany(
      //   { creator: { $eq: 'GeoHub' } },
      //   { $set: { previewImg: getOfficial() } }
      // )

      // if (!result) return throwError(res, 400, 'messed up official')

      // const result2 = await collections.maps?.updateMany(
      //   { creator: { $ne: 'GeoHub' } },
      //   { $set: { previewImg: getCustom() } }
      // )

      // if (!result2) return throwError(res, 400, 'messed up custom')

      // return res.status(200).send('ALL GOOD')

      // const result = await collections.games?.deleteMany({ mode: { $eq: null } })

      // return res.status(200).send(result)

      // const result = await collections.games?.updateMany({ mode: 'streak' }, { $set: { mapId: 'country-streaks' } })

      // return res.status(200).send(result)

      // const result = await collections.games?.updateMany({ streak: { $eq: null } }, { $set: { mode: 'standard' } })

      // return res.status(200).send(result)

      // const result = [] as any[]
      // const countries = countryBounds as any
      // const features = countries.features

      // for (const feature of features) {
      //   const formatted = feature.properties

      //   result.push(formatted)
      // }

      // res.status(200).send(JSON.stringify(result))

      /*
      const result = await collections.games?.updateMany({ round: { $lt: 6 } }, { $set: { state: 'started' } })

      return res.status(200).send(result)
      */
      /*
      const result = await collections.games
        ?.aggregate([
          { $match: { mapId: new ObjectId('6185e0077b54baf63473a542') } },
          {
            $group: {
              _id: '$userId',
            },
          },
        ])
        .toArray()

      if (!result) return throwError(res, 400, 'ISSUE')
      return res.status(200).send(result)

*/

      /*
      const badGames = [] as any[]

      const games = await collections.games?.find({}).toArray()

      if (!games) return res.status(400).send({ error: 'bad' })

      for (const game of games) {
        const map = await collections.maps?.findOne({ _id: new ObjectId(game.mapId) })
        if (!map) {
          const delGame = await collections.games?.deleteOne({ _id: game._id })
          console.log(JSON.stringify(game))
          badGames.push(game)
        }
      }

      return res.status(200).send(badGames)
*/
      /*
    if (req.method === 'POST') {
      const locations = await collections.locations
        ?.find({ mapId: { $ne: new ObjectId('6185df7a7b54baf63473a53e') } })
        .forEach((location) => {
          collections.locations?.updateOne(
            { _id: location._id },
            { $set: { mapId: new ObjectId('6185df7a7b54baf63473a53e') } }
          )
        })

      if (!locations) {
        return res.status(400).send({ message: 'Something went wrong' })
      }

      res.status(200).send({
        message: 'Success',
      })
*/
      /*
      //UPDATES ALL LOCATIONS MISSING A MAPID WITH A SPECIFIED MAPID
      const result = await collections.locations?.updateMany(
        { mapId: null },
        { $set: { mapId: new ObjectId('6185df7a7b54baf63473a53e') } }
      )

      return res.status(200).send(result)
*/
      /*
      const result = await collections.maps?.deleteMany({ creator: { $ne: 'GeoHub' } })

      if (!result) {
        return res.status(400).send({ message: 'somethin wrong' })
      }

      res.status(200).send(result)
*/
      /*
      const randomDate = (start: Date, end: Date) => {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
      }

      const result = await collections.games?.find({ createdAt: null }).forEach((game) => {
        const randDate = randomDate(new Date(2021, 10, 1), new Date(2022, 4, 1))
        console.log(randDate)
        collections.games?.updateOne({ _id: game._id }, { $set: { createdAt: randDate } })
      })

      if (!result) {
        return res.status(400).send({ message: 'Something went wrong updating all users' })
      }

      res.status(200).send({
        message: 'Successfully updated all users in the DB',
      })
      */
    } else {
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false })
  }
}
