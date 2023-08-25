import { calculateDistance } from '@backend/utils'
import { MapType } from '@types'

const WORLD_MAP_SCORE_FACTOR = 2000
const WORLD_MAP_BOUNDS_DISTANCE = 18150

const calculateMapScoreFactor = (bounds: MapType['bounds']) => {
  if (!bounds) return 2000

  const { min, max } = bounds

  const distance = calculateDistance(min, max, 'metric')

  // Use the known World map values to setup a ratio to solve for this map's score factor
  const scoreFactor = (WORLD_MAP_SCORE_FACTOR * Number(distance)) / WORLD_MAP_BOUNDS_DISTANCE

  return scoreFactor
}

export default calculateMapScoreFactor
