/* eslint-disable import/no-anonymous-default-export */
import { collections, dbConnect } from '../../../backend/utils/dbConnect'
import Game from '../../../backend/models/game'
import { NextApiRequest, NextApiResponse } from 'next'
import { getRandomLocation } from '../../../utils/functions/generateLocations'
import { ObjectId } from 'mongodb'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    // Get a specified number of locations from DB
    // If no params -> gets one location from any country
    if (req.method === 'GET') {
      const { countryCode, count } = req.query

      let locations = null

      if (countryCode) {
        locations = await collections.locations
          ?.aggregate([{ $match: { countryCode: countryCode } }, { $sample: { size: Number(count) || 1 } }])
          .toArray()
      } else {
        locations = await collections.locations?.aggregate([{ $sample: { size: Number(count) || 1 } }]).toArray()
      }

      res.status(200).send(locations)
    }

    // Upload a single location to the DB
    else if (req.method === 'POST') {
      const { lat, lng, countryCode } = req.body

      if (
        typeof lat !== 'number' ||
        typeof lng !== 'number' ||
        typeof countryCode !== 'string' ||
        countryCode.length !== 2
      ) {
        return res.status(400).send({ message: 'There was a problem with the uploaded location' })
      }

      const duplicate = await collections.locations?.findOne({ lat: lat, lng: lng })

      if (duplicate) {
        return res.status(400).send({ message: 'This location already exists' })
      }

      const newLocation = {
        lat,
        lng,
        countryCode,
      }

      // add location to DB
      const result = await collections.locations?.insertOne(newLocation)

      if (!result) {
        return res.status(500).send('Failed to add location to DB')
      }

      res.status(201).send({ message: 'The location was successfully added to the DB' })
    } else {
      res.status(405).end(`This endpoint does not allow the method: ${req.method}`)
    }
  } catch (err) {
    console.log(err)
    res.status(400).json({ success: false })
  }
}
