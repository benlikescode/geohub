import fs from 'fs'
import { ObjectId } from 'mongodb'
import { NextApiResponse } from 'next'

import { LocationType } from '@types'
import { URBAN_WORLD_ID } from '@utils/constants/random'
import {
  getRandomLocationsInRadius,
  randomElement
} from '@utils/functions/generateLocations'

import { collections } from './dbConnect'

// Standard return for any error in API
export const throwError = (res: NextApiResponse, status: number, message: string) => {
  return res.status(status).send({
    error: {
      message,
      code: status,
    },
  })
}

// Used for generating game/challenge locations
// count = 1: return LocationType, count > 1: return LocationType[]
export const getLocations = async (mapId: string, count: number = 1) => {
  if (!mapId) return null

  // Determine if this map is an official or custom map
  const map = await collections.maps?.findOne({ _id: new ObjectId(mapId) })

  if (!map) {
    return null
  }

  const locationCollection = map.creator === 'GeoHub' ? 'locations' : 'userLocations'

  // Get random locations from DB
  const locations = await collections[locationCollection]
    ?.aggregate([{ $match: { mapId: new ObjectId(mapId) } }, { $sample: { size: count } }])
    .toArray()

  if (!locations || locations.length === 0) {
    return null
  }

  // If map is urban world, we further randomize it
  if (mapId === URBAN_WORLD_ID) {
    return getRandomLocationsInRadius(locations as LocationType[])
  }

  if (locations.length === 1) {
    return locations[0]
  }

  return locations
}

// Generates one or more locations for the Aerial game mode
export const getAerialLocations = async (difficulty: 'Normal' | 'Easy' | 'Challenging', countryCode: string) => {
  const populationFilter = {
    Easy: 10000000, // 10M
    Normal: 1000000, // 1M
    Challenging: 100000, // 100K
  }

  const query = countryCode ? { iso2: countryCode } : { population: { $gte: populationFilter[difficulty] } }

  const locations = await collections.aerialLocations
    ?.aggregate([{ $match: query }, { $sample: { size: 1 } }])
    .toArray()

  if (!locations || locations.length !== 1) {
    return null
  }

  return locations[0]
}

// Appends array of data to an existing JSON array of data
export const writeToFile = (fileName: string, newData: any[]) => {
  const currData = fs.readFileSync(fileName)
  const currDataParsed = JSON.parse(currData as any)

  const joinedData = currDataParsed.concat(newData)
  const newDataStringified = JSON.stringify(joinedData)

  fs.writeFile(fileName, newDataStringified, (err) => {
    // error checking
    if (err) throw err

    console.log('New data added')
  })
}
