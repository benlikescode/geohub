import fs from 'fs'
/* eslint-disable import/no-anonymous-default-export */
import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

import { collections, dbConnect } from '@backend/utils/dbConnect'
import { throwError } from '@backend/utils/helpers'
import { IS_PROD } from '@backend/utils/secrets'
import { BACKGROUND_COLORS, EMOJIS } from '@utils/constants/avatarOptions'
import countryBounds from '@utils/constants/countryBoundsOld.json'
import { randomElement, randomInt } from '@utils/functions/generateLocations'
import { getRandomAvatar } from '@utils/helperFunctions'

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
      const updateLoc = await collections.locations?.updateMany({ countryCode: 'hk' }, { $set: { countryCode: 'cn' } })

      if (!updateLoc) return throwError(res, 400, 'issue')

      return res.status(200).send('bye bye hong kong')
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
      //UPDATES ALL LOCATIONS MISSING A MAPID WITH A SPECIFIED MAPID
      const result = await collections.locations?.updateMany(
        { mapId: null },
        { $set: { mapId: new ObjectId('631d1a5be3615f68c5ffc4eb') } }
      )

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
