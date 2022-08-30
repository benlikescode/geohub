/* eslint-disable import/no-anonymous-default-export */
import { collections, dbConnect } from '../../../backend/utils/dbConnect'
import Game from '../../../backend/models/game'
import { NextApiRequest, NextApiResponse } from 'next'
import { getRandomLocation, randomElement, randomInt } from '../../../utils/functions/generateLocations'
import { ObjectID, ObjectId } from 'mongodb'
import cities from '../../../utils/locations/cities.json'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    if (req.method === 'POST') {
      const locations = []

      const queryType = randomInt(1, 4)
      if (queryType === 1 || queryType === 2) {
        const possibleCities = cities as any[]

        while (locations.length < 15) {
          const location = randomElement(possibleCities)

          const formattedLocation = {
            lat: location.lat,
            lng: location.lng,
            countryCode: location.iso2,
          }

          locations.push(formattedLocation)
        }
      } else {
        while (locations.length < 15) {
          const locationResponse = await fetch('https://api.3geonames.org/?randomland=CA&json=1')
          const location = await locationResponse.json()

          const formattedLocation = {
            lat: Number(location?.nearest?.latt),
            lng: Number(location?.nearest?.longt),
            countryCode: location?.nearest?.state,
          }

          locations.push(formattedLocation)
        }
      }

      console.log(locations)

      res.status(200).send(locations)
    } else if (req.method === 'PUT') {
    } else {
      res.status(500).json({ message: 'Invalid request' })
    }
  } catch (err) {
    console.log(err)
    res.status(400).json({ success: false })
  }
}
