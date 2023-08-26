const EARTH_RADIUS_KILOMETERS = 6371.071
const EARTH_RADIUS_MILES = 3958.799

const toRadians = (degrees: number) => {
  return degrees * (Math.PI / 180)
}

// Gets the distance between guess and actual locations
const calculateDistance = (
  loc1: { lat: number; lng: number },
  loc2: { lat: number; lng: number },
  distanceUnit: 'metric' | 'imperial'
) => {
  const lat1Rad = toRadians(loc1.lat)
  const lng1Rad = toRadians(loc1.lng)
  const lat2Rad = toRadians(loc2.lat)
  const lng2Rad = toRadians(loc2.lng)

  const deltaLat = lat2Rad - lat1Rad
  const deltaLng = lng2Rad - lng1Rad

  const R = distanceUnit === 'imperial' ? EARTH_RADIUS_MILES : EARTH_RADIUS_KILOMETERS

  const distance =
    2 *
    R *
    Math.asin(
      Math.sqrt(
        Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
          Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2)
      )
    )

  return distance
}

export default calculateDistance
