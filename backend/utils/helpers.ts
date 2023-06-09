import fs from 'fs'
import { ObjectId } from 'mongodb'
import { NextApiResponse } from 'next'
import { LocationType } from '@types'
import { COUNTRY_STREAKS_ID, OFFICIAL_WORLD_ID, URBAN_WORLD_ID } from '@utils/constants/random'
import { getRandomLocationsInRadius, randomElement } from '@utils/functions/generateLocations'
import { collections } from './dbConnect'

// Standard return for any error in API
export const throwError = (res: NextApiResponse, status: number, clientMessage: string, debugInfo?: string) => {
  return res.status(status).send({
    error: {
      message: clientMessage,
      code: status,
      debug: debugInfo,
    },
  })
}

// The MASTER function that retrieves game, challenge, or streak locations
// (NOTE: may need to split this into multiple functions in future)
// returns Location | Location[]
export const getLocations = async (mapId: string, count: number = 1) => {
  if (!mapId) return null

  if (mapId === COUNTRY_STREAKS_ID) {
    const locations = (await collections.locations
      ?.aggregate([
        { $match: { mapId: new ObjectId(OFFICIAL_WORLD_ID), countryCode: { $ne: null } } },
        { $sample: { size: count } },
      ])
      .toArray()) as LocationType[]

    if (!locations || locations.length === 0) {
      return null
    }

    if (locations.length === 1) {
      return locations[0]
    }

    return locations
  }

  // Determine if this map is an official or custom map
  const map = await collections.maps?.findOne({ _id: new ObjectId(mapId) })

  if (!map) {
    return null
  }

  const locationCollection = map.creator === 'GeoHub' ? 'locations' : 'userLocations'

  // Get random locations from DB
  const locations = (await collections[locationCollection]
    ?.aggregate([{ $match: { mapId: new ObjectId(mapId) } }, { $sample: { size: count } }])
    .toArray()) as LocationType[]

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

// TO DELETE
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

export const isUserAnAdmin = async (userId?: string) => {
  if (!userId) {
    return false
  }

  const user = await collections.users?.findOne({ _id: new ObjectId(userId) })

  if (!user) {
    return false
  }

  return user.isAdmin
}
