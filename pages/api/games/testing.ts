/* eslint-disable import/no-anonymous-default-export */
import { collections, dbConnect } from '../../../backend/utils/dbConnect'
import Game from '../../../backend/models/game'
import { NextApiRequest, NextApiResponse } from 'next'
import { getRandomLocation, randomElement, randomInt } from '../../../utils/functions/generateLocations'
import { ObjectID, ObjectId } from 'mongodb'
import cities from '../../../utils/locations/cities.json'

const countryCodes = [
  { name: 'Albania', code: 'AL', weight: 3 },
  { name: 'Argentina', code: 'AR', weight: 25 },
  { name: 'Australia', code: 'AU', weight: 35 },
  { name: 'Austria', code: 'AT', weight: 10 },
  { name: 'Bangladesh', code: 'BD', weight: 4 },
  { name: 'Belgium', code: 'BE', weight: 8 },
  { name: 'Bhutan', code: 'BT', weight: 1 },
  { name: 'Bolivia', code: 'BO', weight: 6 },
  { name: 'Botswana', code: 'BW', weight: 5 },
  { name: 'Brazil', code: 'BR', weight: 40 },
  { name: 'Bulgaria', code: 'BG', weight: 6 },
  { name: 'Cambodia', code: 'KH', weight: 8 },
  { name: 'Canada', code: 'CA', weight: 45 },
  { name: 'Chile', code: 'CL', weight: 13 },
  { name: 'Christmas Island', code: 'CX', weight: 1 },
  { name: 'Colombia', code: 'CO', weight: 15 },
  { name: 'Costa Rica', code: 'CR', weight: 1 },
  { name: 'Croatia', code: 'HR', weight: 5 },
  { name: 'Czech Republic', code: 'CZ', weight: 8 },
  { name: 'Denmark', code: 'DK', weight: 12 },
  { name: 'Dominican Republic', code: 'DO', weight: 3 },
  { name: 'Ecuador', code: 'EC', weight: 5 },
  { name: 'Estonia', code: 'EE', weight: 3 },
  { name: 'Eswatini', code: 'SZ', weight: 5 },
  { name: 'Finland', code: 'FI', weight: 14 },
  { name: 'France', code: 'FR', weight: 31 },
  { name: 'Germany', code: 'DE', weight: 4 },
  { name: 'Ghana', code: 'GH', weight: 8 },
  { name: 'Greece', code: 'GR', weight: 8 },
  { name: 'Guatemala', code: 'GT', weight: 5 },
  { name: 'Hungary', code: 'HU', weight: 8 },
  { name: 'Iceland', code: 'IS', weight: 5 },
  { name: 'India', code: 'IN', weight: 1 },
  { name: 'Indonesia', code: 'ID', weight: 17 },
  { name: 'Ireland', code: 'IE', weight: 6 },
  { name: 'Israel', code: 'IL', weight: 8 },
  { name: 'Italy', code: 'IT', weight: 23 },
  { name: 'Japan', code: 'JP', weight: 30 },
  { name: 'Jordan', code: 'JO', weight: 6 },
  { name: 'Kenya', code: 'KE', weight: 16 },
  { name: 'South Korea', code: 'KR', weight: 16 },
  { name: 'Kyrgyzstan', code: 'KG', weight: 5 },
  { name: 'Laos', code: 'LA', weight: 1 },
  { name: 'Latvia', code: 'LV', weight: 4 },
  { name: 'Lebanon', code: 'LB', weight: 1 },
  { name: 'Lesotho', code: 'LS', weight: 6 },
  { name: 'Lithuania', code: 'LT', weight: 5 },
  { name: 'Luxembourg', code: 'LU', weight: 3 },
  { name: 'Malaysia', code: 'MY', weight: 23 },
  { name: 'Mexico', code: 'MX', weight: 34 },
  { name: 'Monaco', code: 'MC', weight: 1 },
  { name: 'Mongolia', code: 'MN', weight: 2 },
  { name: 'Montenegro', code: 'ME', weight: 4 },
  { name: 'Netherlands', code: 'NL', weight: 9 },
  { name: 'New Zealand', code: 'NZ', weight: 14 },
  { name: 'Nigeria', code: 'NG', weight: 10 },
  { name: 'Norway', code: 'NO', weight: 15 },
  { name: 'Peru', code: 'PE', weight: 12 },
  { name: 'Philippines', code: 'PH', weight: 14 },
  { name: 'Poland', code: 'PL', weight: 15 },
  { name: 'Portugal', code: 'PT', weight: 8 },
  { name: 'Puerto Rico', code: 'PR', weight: 1 },
  { name: 'Romania', code: 'RO', weight: 10 },
  { name: 'Russia', code: 'RU', weight: 13 },
  { name: 'Senegal', code: 'SN', weight: 8 },
  { name: 'Serbia', code: 'RS', weight: 5 },
  { name: 'Singapore', code: 'SG', weight: 5 },
  { name: 'Slovakia', code: 'SK', weight: 6 },
  { name: 'Slovenia', code: 'SI', weight: 5 },
  { name: 'South Africa', code: 'ZA', weight: 36 },
  { name: 'Spain', code: 'ES', weight: 23 },
  { name: 'Sri Lanka', code: 'LK', weight: 7 },
  { name: 'Sweden', code: 'SE', weight: 15 },
  { name: 'Switzerland', code: 'CH', weight: 5 },
  { name: 'Taiwan', code: 'TW', weight: 15 },
  { name: 'Thailand', code: 'TH', weight: 20 },
  { name: 'Tunisia', code: 'TN', weight: 5 },
  { name: 'Turkey', code: 'TR', weight: 18 },
  { name: 'Uganda', code: 'UG', weight: 3 },
  { name: 'Ukraine', code: 'UA', weight: 6 },
  { name: 'United Kingdom', code: 'UK', weight: 24 },
  { name: 'United States', code: 'US', weight: 60 },
  { name: 'Uruguay', code: 'UY', weight: 6 },
  { name: 'U.S. Virgin Islands', code: 'VI', weight: 1 },
  { name: 'Vietnam', code: 'VN', weight: 3 },
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
  const possibleCities = cities as any[]
  const location = randomElement(possibleCities)

  const formattedLocation = {
    lat: location.lat,
    lng: location.lng,
    countryCode: location.iso2,
  }

  return formattedLocation
}

const getLocationInCountry = async () => {
  const countryCode = chooseCountryByWeight()
  console.log(`COUNTRY CODE: ${countryCode}`)
  const locationResponse = await fetch(`https://api.3geonames.org/?randomland=${countryCode}&json=1`)
  const location = await locationResponse.json()

  const formattedLocation = {
    lat: Number(location?.nearest?.latt),
    lng: Number(location?.nearest?.longt),
    countryCode: location?.nearest?.state,
  }

  return formattedLocation
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect()

    if (req.method === 'POST') {
      const locations = []

      while (locations.length < 15) {
        const queryType = randomInt(1, 4)
        if (queryType === 1 || queryType === 2) {
          const location = getLocationNearCity()
          locations.push(location)
        } else {
          const location = await getLocationInCountry()
          locations.push(location)
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
