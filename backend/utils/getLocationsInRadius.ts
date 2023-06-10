import { LocationType } from '@types'
import { randomRange } from '@utils/helpers'

// Generates new locations from an array of locations by choosing a new location within a radius
// Default for radius is 0.01 (which is ~ 1.11km)
const getLocationsInRadius = (locations: LocationType[], radius = 0.01) => {
  if (locations.length > 1) {
    const newLocations: LocationType[] = []

    for (let i = 0; i < locations.length; i++) {
      const centerLat = locations[i].lat
      const centerLng = locations[i].lng

      const randomLocation: LocationType = {
        ...locations[i],
        lat: randomRange(centerLat - radius, centerLat + radius),
        lng: randomRange(centerLng - radius, centerLng + radius),
      }
      newLocations.push(randomLocation)
    }

    return newLocations
  }

  const centerLat = locations[0].lat
  const centerLng = locations[0].lng

  const randomLocation: LocationType = {
    ...locations[0],
    lat: randomRange(centerLat - radius, centerLat + radius),
    lng: randomRange(centerLng - radius, centerLng + radius),
  }

  return randomLocation
}

export default getLocationsInRadius
