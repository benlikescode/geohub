import { ObjectId } from 'mongodb'
import { collections } from '@backend/utils'
import { GameType, LocationType } from '@types'

const getLocations = async (mapId: ObjectId, mode: GameType['mode'], count: number = 5) => {
  if (!mapId) return null

  const map = await collections.maps?.findOne({ _id: mapId })

  if (!map) {
    return null
  }

  const locationCollection = map.creator === 'GeoHub' ? 'locations' : 'userLocations'

  // If playing streaks -> ensure country code exists
  const query = mode === 'streak' ? { mapId, countryCode: { $ne: null } } : { mapId }

  const locations = (await collections[locationCollection]
    ?.aggregate([
      { $match: query },
      { $sample: { size: count } },
      { $group: { _id: '$_id', doc: { $first: '$$ROOT' } } },
      { $replaceRoot: { newRoot: '$doc' } },
    ])
    .toArray()) as LocationType[]

  if (!locations || locations.length === 0) {
    return null
  }

  return locations
}

export default getLocations
