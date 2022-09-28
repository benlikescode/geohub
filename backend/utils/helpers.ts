import { ObjectId } from 'mongodb'
import { NextApiResponse } from 'next'

import { LocationType } from '@types'
import {
  getRandomLocationsInRadius,
  randomElement
} from '@utils/functions/generateLocations'
import populatedAreas from '@utils/locations/populatedAreas.json'

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
  console.log(`MAPID: ${mapId}`)
  if (!mapId) return null

  // If map is Urban World
  if (mapId === '631d1a5be3615f68c5ffc4eb') {
    const locations: LocationType[] = []

    for (let i = 0; i < count; i++) {
      locations.push(randomElement(populatedAreas))
    }

    return getRandomLocationsInRadius(locations)
  }

  // Otherwise: get random locations from DB
  const locations = await collections.locations
    ?.aggregate([{ $match: { mapId: new ObjectId(mapId) } }, { $sample: { size: count } }])
    .toArray()

  if (!locations || locations.length === 0) return null

  if (locations.length === 1) {
    return locations[0]
  }

  return locations
}
