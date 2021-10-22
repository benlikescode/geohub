import { LocationType } from "../../types"
import * as worldHandPicked from '../../utils/locations/world.json'

export const randomRange = (min = 0, max = 100, precision = 10) => { 
  return parseFloat((Math.random() * (max - min) + min).toFixed(precision))
}

export const randomInt = (min = 0, max = 5) => {
  return Math.floor(Math.random() * (max - min) + min)
}

export const randomElement = (array: any[]) => {
  return array[Math.floor(Math.random() * array.length)]
}

export const getLocationsFromMapId = (mapId: string, locationsType: 'random' | 'handPicked', numLocations = 5) => {
  let locations: LocationType[] = []
  switch(mapId) {
    case 'world':
      if (locationsType === 'random') {
        locations = generateUS()
      }
      else {
        locations = getRandomLocationsFromArray(worldHandPicked, numLocations)
      }
      break
    case 'famous-landmarks':
      locations = getRandomLocationsFromArray(FamousLocations)
      break
    case 'canada':
      locations = generateCanada()
      break
    case 'usa':
      locations = generateUS()
      break
    default:
      console.log('Invalid Map Id')
  }

  return locations
}

export const getRandomLocationsFromArray = (array: any[], numLocations = 5) => {
  let locations: LocationType[] = []

  for (let i = 0; i < numLocations; i++) {
    let location = randomElement(array)

    if (locations.includes(location)) {
      while (locations.includes(location)) {
        location = randomElement(array)
      }
    }
    
    locations.push(location)
  }

  return locations
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
export const getRandomLocationsInRadius = (locations: LocationType[], radius = 0.10) => {
  if (locations.length > 1) {
    const newLocations: LocationType[] = []

    for (let i = 0; i < locations.length; i++) {
      const centerLat = locations[i].lat
      const centerLng = locations[i].lng

      const randomLocation: LocationType = {
        lat: randomRange(centerLat - radius, centerLat + radius),
        lng: randomRange(centerLng - radius, centerLng + radius)
      }
      newLocations.push(randomLocation)
    }

    return newLocations
  }
  
  const centerLat = locations[0].lat
  const centerLng = locations[0].lng

  const randomLocation: LocationType = {
    lat: randomRange(centerLat - radius, centerLat + radius),
    lng: randomRange(centerLng - radius, centerLng + radius)
  }
  
  return randomLocation
}

export const generateLocations = (map: string, numLocations = 5) => {
  let locations: LocationType[] = []

  switch(map) {
    case 'World':
      locations = generateUS()
      break

  }

  return locations

}

// lat 34 => 42
// lng -120 => -80
export const generateUS = (numLocations = 5) => {
  const locations: LocationType[] = []

  for (let i = 0; i < numLocations; i++) {
    // 25% chance of generating a city
    if (randomInt(1, 4) === 2) {
      const city = randomElement(USCities)
      locations.push(city)
    }
    else {
      locations.push({
        lat: randomRange(34, 42),
        lng: randomRange(-120, -80)
      })
    }  
  }

  return locations
}

// lat 48.63 => 51.56
// lng -125.12 => -54.13
export const generateCanada = (numLocations = 5) => {
  const locations: LocationType[] = []

  for (let i = 0; i < numLocations; i++) {
    // 25% chance of generating a city
    if (randomInt(1, 4) === 2) {
      console.log("City Round")
      const city = randomElement(CanadaCities)
      locations.push(city)
    }
    else {
      locations.push({
        lat: randomRange(48.63, 51.56),
        lng: randomRange(-125.12, -54.13)
      })
    }
      
    
  }
  return locations

}


export const USCities: LocationType[] = [
  {lat: 39.983334, lng: -82.983330}, // Columbus
  {lat: 30.266666, lng: -97.733330}, // Austin
  {lat: 32.779167, lng: -96.808891}, // Dallas
  {lat: 29.749907, lng: -95.358421}, // Houston
  {lat: 25.82, lng: -80.20}, // Miami
  {lat: 39.983334, lng: -82.983330}, // Columbus
  {lat: 39.983334, lng: -82.983330}, // Columbus
  {lat: 39.983334, lng: -82.983330}, // Columbus
]

export const CanadaCities: LocationType[] = [
  {lat: 43.650, lng: -79.380}, // Toronto
  {lat: 45.520, lng: -73.570}, // Montreal
  {lat: 49.280, lng: -123.130}, // Vancouver
  {lat: 51.050, lng: -114.060}, // Calgary
  {lat: 45.420, lng: -75.710}, // Ottawa
  {lat: 53.570, lng: -113.540}, // Edmonton
  {lat: 44.670, lng: -63.610}, // Halifax
]

export const Europe: LocationType[] = [
  {lat: 46.227638, lng: 2.213749}, // France
  {lat: 55.378051, lng: -3.435973}, // United Kingdom
  {lat: 40.463667, lng: -3.74922}, // Spain
  {lat: 41.87194, lng: 12.56738}, // Italy
  {lat: 45.943161, lng: 24.96676}, // Romania
  {lat: 49.817492, lng: 15.472962}, // Czech Republic
]

export const Columbia: LocationType[] = [
  {lat: 4.652973, lng: -74.083758}, // Bogota Cluster
  {lat: 6.241842, lng: -75.582878}, // Mendellin Cluster
]

export const Brazil: LocationType[] = [
  {lat: -22.380556, lng: -49.036122}, // Sao Paulo Center
  {lat: -19.920422, lng: -43.944732}, // Belo Horizonte
  {lat: -22.380556, lng: -49.036122}, // Sao Paulo Center
  {lat: -19.920422, lng: -43.944732}, // Belo Horizonte
  {lat: -19.920422, lng: -43.944732}, // Belo Horizonte
]

export const FamousLocations: LocationType[] = [
  {lat: 48.8601743, lng: 2.2915141}, // Eifel Tower (France)
  {lat: 41.889266, lng: 12.4925798}, // Coluseum (Italy)
  {lat: 43.7227141, lng: 10.3963126}, // Leaning Tower of Piza (Italy)
  {lat: 29.979394, lng: 31.1368655}, // Great Pyramids (Egypt)
  {lat: 43.6408281, lng: -79.3876868}, // CN Tower (Toronto)
  {lat: 37.8262191, lng: -122.4222576}, // Alcatraz (SF)
  {lat: -13.163489, lng: -72.5448154}, // Machu Picchu (Peru) 
  {lat: 40.6888181, lng: -74.0437079}, // Statue of Liberty (NY)
  {lat: 27.1724677, lng: 78.0422923}, // Taj Mahal
  {lat: -33.8580079, lng: 151.2142606}, // Opera House (Sydney)
]
