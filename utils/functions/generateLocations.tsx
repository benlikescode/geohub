import { LocationType } from '@types'
import worldHandPicked from '@utils/locations/world.json'
import famousHandPicked from '@utils/locations/famousLocations.json'
import canadaHandPicked from '@utils/locations/canada.json'
import usaHandPicked from '@utils/locations/unitedStates.json'
import europeHandPicked from '@utils/locations/europe.json'
import diverseWorld from '@utils/locations/diverseWorld.json'

export const randomRange = (min = 0, max = 100, precision = 10) => {
  return parseFloat((Math.random() * (max - min) + min).toFixed(precision))
}

// generates between min (inclusive) and max (exclusive)
export const randomInt = (min = 0, max = 5) => {
  return Math.floor(Math.random() * (max - min) + min)
}

export const randomElement = (array: any[]) => {
  return array[Math.floor(Math.random() * array.length)]
}

export const getRandomLocationsFromArray = (array: any[], numLocations = 5) => {
  let locations: LocationType[] = []

  for (let i = 0; i < numLocations; i++) {
    let location = randomElement(array)

    /* Deal with unique rounds later
    if (locations.includes(location)) {
      while (locations.includes(location)) {
        location = randomElement(array)
      }
    }
*/

    locations.push(location)
  }

  return locations
}

// CURRENT METHOD THAT GETS CALLED FROM API (GENERATES 1 ROUND AT A TIME)
export const getRandomLocation = (
  locationType: 'random' | 'handpicked',
  mapId: string,
  userLocation: { lat: number; lng: number } | null = null
) => {
  switch (mapId) {
    case 'world':
      if (locationType === 'random') {
        // TODO
      } else {
        return randomElement(diverseWorld)
      }
    case 'famous-landmarks':
      if (locationType === 'random') {
        // TODO
      } else {
        return randomElement(famousHandPicked)
      }
    case 'canada':
      if (locationType === 'random') {
        // TODO
      } else {
        return randomElement(canadaHandPicked)
      }
    case 'usa':
      if (locationType === 'random') {
        // TODO
      } else {
        return randomElement(usaHandPicked)
      }
    case 'near-you':
      if (userLocation != null) {
        return getRandomLocationsInRadius([userLocation], 0.3)
      }
    case 'europe':
      if (locationType === 'random') {
        // TODO
      } else {
        return randomElement(europeHandPicked)
      }
    default:
      console.log('Invalid Map Id')
      return null
  }
}

// CURRENT METHOD USED FOR CHALLENGES (GETS ALL 5 LOCATIONS AT ONCE)
export const getRandomLocations = (locationType: 'random' | 'handpicked', mapId: string) => {
  switch (mapId) {
    case 'world':
      if (locationType === 'random') {
        // TODO
      } else {
        return getRandomLocationsFromArray(worldHandPicked)
      }
    case 'famous-landmarks':
      if (locationType === 'random') {
        // TODO
      } else {
        return getRandomLocationsFromArray(famousHandPicked)
      }
    case 'canada':
      if (locationType === 'random') {
        // TODO
      } else {
        return getRandomLocationsFromArray(canadaHandPicked)
      }
    case 'usa':
      if (locationType === 'random') {
        // TODO
      } else {
        return getRandomLocationsFromArray(usaHandPicked)
      }
    case 'europe':
      if (locationType === 'random') {
        // TODO
      } else {
        return getRandomLocationsFromArray(europeHandPicked)
      }
    default:
      console.log('Invalid Map Id')
      return null
  }
}

/* 

This method can be used on any center location of a city and depending on the radius, 
will generate a random location some distance from the center of the city

The following values are aproximately true for most cities but will vary depending on 
the size of the city

radius > 0.10 => random location from outer suburbs of the city
radius ~= 0.10 => random location in the greater area of the city
radius < 0.05 => random location in downtown area of the city

returns a single random location (if given 1 location) or 
an array of random locations (if given more than 1 location)

*/
export const getRandomLocationsInRadius = (locations: LocationType[], radius = 0.05) => {
  if (locations.length > 1) {
    const newLocations: LocationType[] = []

    for (let i = 0; i < locations.length; i++) {
      const centerLat = locations[i].lat
      const centerLng = locations[i].lng

      const randomLocation: LocationType = {
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
    lat: randomRange(centerLat - radius, centerLat + radius),
    lng: randomRange(centerLng - radius, centerLng + radius),
  }

  return randomLocation
}
