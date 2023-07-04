import { calculateDistance } from '@backend/utils'
import bbox from '@turf/bbox'
import { featureCollection, point } from '@turf/helpers'
import { GuessType, LocationType } from '@types'

const WORLD_MAP_SCORE_FACTOR = 2000
const WORLD_MAP_BOUNDS_DISTANCE = 18150

const calculateMapScoreFactor = (locations: LocationType[]) => {
  // Format locations for turfJS
  const coordinates = locations.map((x) => [x.lng, x.lat])
  const points = coordinates.map((coord) => point(coord))

  // Get bounding box around map's locations
  const fc = featureCollection(points)
  const box = bbox(fc)

  // Get the distance between the two bounding points
  const minPoint = { lat: box[1], lng: box[0] } as GuessType
  const maxPoint = { lat: box[3], lng: box[2] } as LocationType
  const distance = calculateDistance(minPoint, maxPoint, 'metric')

  // Use the known World map values to setup a ratio to solve for this map's score factor
  const scoreFactor = (WORLD_MAP_SCORE_FACTOR * Number(distance)) / WORLD_MAP_BOUNDS_DISTANCE

  return scoreFactor
}

export default calculateMapScoreFactor
