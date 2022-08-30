/* eslint-disable import/no-anonymous-default-export */
import { collections, dbConnect } from '../../../backend/utils/dbConnect'
import Game from '../../../backend/models/game'
import { NextApiRequest, NextApiResponse } from 'next'
import { getRandomLocation } from '../../../utils/functions/generateLocations'
import { ObjectId } from 'mongodb'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    const { lat, lng, countryCode } = req.body

    const validateData = async () => {
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
    }

    if (req.method === 'POST') {
      await validateData()

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
