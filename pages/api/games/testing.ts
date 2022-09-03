import { ObjectID, ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

import Game from '@backend/models/game'
/* eslint-disable import/no-anonymous-default-export */
import { collections, dbConnect } from '@backend/utils/dbConnect'
import {
  getRandomLocation,
  getRandomLocationsInRadius,
  randomElement,
  randomInt
} from '@utils/functions/generateLocations'
import cities from '@utils/locations/cities.json'
import populatedAreas from '@utils/locations/populatedAreas.json'

const countryCodes = [
  { name: 'Albania', code: 'al', weight: 3 },
  { name: 'Argentina', code: 'ar', weight: 25 },
  { name: 'Australia', code: 'au', weight: 35 },
  { name: 'Austria', code: 'at', weight: 10 },
  { name: 'Bangladesh', code: 'bd', weight: 4 },
  { name: 'Belgium', code: 'be', weight: 8 },
  { name: 'Bhutan', code: 'bt', weight: 1 },
  { name: 'Bolivia', code: 'bo', weight: 6 },
  { name: 'Botswana', code: 'bw', weight: 5 },
  { name: 'Brazil', code: 'br', weight: 40 },
  { name: 'Bulgaria', code: 'bg', weight: 6 },
  { name: 'Cambodia', code: 'kh', weight: 8 },
  { name: 'Canada', code: 'ca', weight: 45 },
  { name: 'Chile', code: 'cl', weight: 13 },
  { name: 'Christmas Island', code: 'cx', weight: 1 },
  { name: 'Colombia', code: 'co', weight: 15 },
  { name: 'Costa Rica', code: 'cr', weight: 1 },
  { name: 'Croatia', code: 'hr', weight: 5 },
  { name: 'Czech Republic', code: 'cz', weight: 8 },
  { name: 'Denmark', code: 'dk', weight: 12 },
  { name: 'Dominican Republic', code: 'do', weight: 3 },
  { name: 'Ecuador', code: 'ec', weight: 5 },
  { name: 'Estonia', code: 'ee', weight: 3 },
  { name: 'Eswatini', code: 'sz', weight: 5 },
  { name: 'Finland', code: 'fi', weight: 14 },
  { name: 'France', code: 'fr', weight: 31 },
  { name: 'Germany', code: 'de', weight: 4 },
  { name: 'Ghana', code: 'gh', weight: 8 },
  { name: 'Greece', code: 'gr', weight: 8 },
  { name: 'Guatemala', code: 'gt', weight: 5 },
  { name: 'Hungary', code: 'hu', weight: 8 },
  { name: 'Iceland', code: 'is', weight: 5 },
  { name: 'India', code: 'in', weight: 1 },
  { name: 'Indonesia', code: 'id', weight: 17 },
  { name: 'Ireland', code: 'ie', weight: 6 },
  { name: 'Israel', code: 'il', weight: 8 },
  { name: 'Italy', code: 'it', weight: 23 },
  { name: 'Japan', code: 'jp', weight: 30 },
  { name: 'Jordan', code: 'jo', weight: 6 },
  { name: 'Kenya', code: 'ke', weight: 16 },
  { name: 'South Korea', code: 'kr', weight: 16 },
  { name: 'Kyrgyzstan', code: 'kg', weight: 5 },
  { name: 'Laos', code: 'la', weight: 1 },
  { name: 'Latvia', code: 'lv', weight: 4 },
  { name: 'Lebanon', code: 'lb', weight: 1 },
  { name: 'Lesotho', code: 'ls', weight: 6 },
  { name: 'Lithuania', code: 'lt', weight: 5 },
  { name: 'Luxembourg', code: 'lu', weight: 3 },
  { name: 'Malaysia', code: 'my', weight: 23 },
  { name: 'Mexico', code: 'mx', weight: 34 },
  { name: 'Monaco', code: 'mc', weight: 1 },
  { name: 'Mongolia', code: 'mn', weight: 2 },
  { name: 'Montenegro', code: 'me', weight: 4 },
  { name: 'Netherlands', code: 'nl', weight: 9 },
  { name: 'New Zealand', code: 'nz', weight: 14 },
  { name: 'Nigeria', code: 'ng', weight: 10 },
  { name: 'Norway', code: 'no', weight: 15 },
  { name: 'Peru', code: 'pe', weight: 12 },
  { name: 'Philippines', code: 'ph', weight: 14 },
  { name: 'Poland', code: 'pl', weight: 15 },
  { name: 'Portugal', code: 'pt', weight: 8 },
  { name: 'Puerto Rico', code: 'pr', weight: 1 },
  { name: 'Romania', code: 'ro', weight: 10 },
  { name: 'Russia', code: 'ru', weight: 13 },
  { name: 'Senegal', code: 'sn', weight: 8 },
  { name: 'Serbia', code: 'rs', weight: 5 },
  { name: 'Singapore', code: 'sg', weight: 5 },
  { name: 'Slovakia', code: 'sk', weight: 6 },
  { name: 'Slovenia', code: 'si', weight: 5 },
  { name: 'South Africa', code: 'za', weight: 36 },
  { name: 'Spain', code: 'es', weight: 23 },
  { name: 'Sri Lanka', code: 'lk', weight: 7 },
  { name: 'Sweden', code: 'se', weight: 15 },
  { name: 'Switzerland', code: 'ch', weight: 5 },
  { name: 'Taiwan', code: 'tw', weight: 15 },
  { name: 'Thailand', code: 'th', weight: 20 },
  { name: 'Tunisia', code: 'tn', weight: 5 },
  { name: 'Turkey', code: 'tr', weight: 18 },
  { name: 'Uganda', code: 'ug', weight: 3 },
  { name: 'Ukraine', code: 'ua', weight: 6 },
  { name: 'United Kingdom', code: 'uk', weight: 24 },
  { name: 'United States', code: 'us', weight: 60 },
  { name: 'Uruguay', code: 'uy', weight: 6 },
  { name: 'U.S. Virgin Islands', code: 'vi', weight: 1 },
  { name: 'Vietnam', code: 'vn', weight: 3 },
]

const chooseCountryByWeight = () => {
  // sort weights in ascending order
  countryCodes.sort((a, b) => {
    return a.weight - b.weight
  })

  let totalWeight = countryCodes.reduce((acc, value) => {
    return acc + value.weight
  }, 0)

  const random = Math.floor(Math.random() * totalWeight)

  for (let i = 0; i < countryCodes.length; i++) {
    totalWeight -= countryCodes[i].weight

    if (random >= totalWeight) {
      return countryCodes[i].code
    }
  }
}

const getLocationNearCity = () => {
  const possibleLocations = populatedAreas as any[]
  const location = randomElement(possibleLocations)

  const nearbyLatLng = getRandomLocationsInRadius([location])

  console.log(`originalLocation: ${JSON.stringify(location)}, newLocation: ${JSON.stringify(nearbyLatLng)}`)

  const newLocation = {
    ...location,
    ...nearbyLatLng,
  }

  return newLocation
}

const getLocationInCountry = async () => {
  const countryCode = chooseCountryByWeight()
  console.log(`COUNTRY CODE: ${countryCode}`)
  const locationResponse = await fetch(`https://api.3geonames.org/?randomland=${countryCode}&json=1`)
  const location = await locationResponse.json()

  const formattedLocation = {
    lat: Number(location?.nearest?.latt),
    lng: Number(location?.nearest?.longt),
    countryCode: location?.nearest?.state?.toLowerCase(),
  }

  return formattedLocation
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    if (req.method === 'POST') {
      const locations = []

      while (locations.length < 15) {
        const location = getLocationNearCity()
        locations.push(location)
        /*
        const queryType = randomInt(1, 4)
        if (queryType === 1 || queryType === 2) {
          const location = getLocationNearCity()
          locations.push(location)
        } else {
          const location = await getLocationInCountry()
          locations.push(location)
        }
        */
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
