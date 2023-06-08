import { DistanceType } from '../../@types'
import formatLargeNumber from './formatLargeNumber'

// Takes in distance and the user's preferred distance unit
const formatDistance = (distance: DistanceType, distanceUnit?: 'metric' | 'imperial') => {
  const SMALL_UNIT = distanceUnit === 'imperial' ? 'yd' : 'm'
  const LARGE_UNIT = distanceUnit === 'imperial' ? 'miles' : 'km'
  const UNIT_MULTIPLIER = distanceUnit === 'imperial' ? 1760 : 1000

  const distanceValue = distance[distanceUnit || 'metric']

  if (distanceValue < 1) {
    return `${Math.round(distanceValue * UNIT_MULTIPLIER)} ${SMALL_UNIT}`
  }

  return `${formatLargeNumber(Math.round(distanceValue))} ${LARGE_UNIT}`
}

export default formatDistance
