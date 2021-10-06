import { LocationType } from "../../types"

export const randomRange = (min = 0, max = 100, precision = 10) => { 
  return parseFloat((Math.random() * (max - min) + min).toFixed(precision))
}

export const randomInt = (min = 0, max = 5) => {
  return Math.floor(Math.random() * (max - min) + min)
}

export const randomElement = (array: any[]) => {
  return array[Math.floor(Math.random() * array.length)]
}

/* 

This method can be used on any center location of a city and depending on the radius, 
will generate a random location some distance from the center of the city

The following values are aproximately true for most cities but will vary depending on 
the size of the city

radius > 0.10 => random location from outer suburbs of the city
radius ~= 0.10 => random location in the greater area of the city
radius < 0.05 => random location in downtown area of the city

*/
export const getRandomLocationInRadius = (location: LocationType, radius = 0.10) => {
  const centerLat = location.lat
  const centerLng = location.lng

  const randomLocation: LocationType = {
    lat: randomRange(centerLat - radius, centerLat + radius),
    lng: randomRange(centerLng - radius, centerLng + radius)
  }

  return [randomLocation]
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

export const generateUSCity = (cityIdx: number, numLocations = 1) => {
  const locations: LocationType[] = []

  for (let i = 0; i < numLocations; i++) {
    switch(cityIdx) {

      // New York City
      case 0:
        locations.push({
          lat: randomRange(40, 41),
          lng: randomRange(-74, -73)
        })
        break

      // Chicago
      case 1:
        locations.push({
          lat: randomRange(41.85, 41.89),
          lng: randomRange(-87.63, -87.61)
        })
        break
      
      // Los Angeles
      case 2:
        locations.push({
          lat: randomRange(33.62, 34.17),
          lng: randomRange(-118.36, -117.65)
        })
        break
      
      // Houston
      default:
        locations.push({
          lat: randomRange(29.68, 29.81),
          lng: randomRange(-95.45, -95.27)
        })
    }
  } 

  return locations
}






const USCities: LocationType[] = [
  // New York (0)
  {lat: randomRange(40, 41), lng: randomRange(-74, -73)},

  // Chicago (1)
  {lat: randomRange(41.85, 41.89), lng: randomRange(-87.63, -87.61)},

  // Los Angeles (2)
  {lat: randomRange(33.62, 34.17), lng: randomRange(-118.36, -117.65)},

  // San Francisco (3)
  {lat: randomRange(37.73, 37.80), lng: randomRange(-122.50, -122.40)},

  // Houston (4)
  {lat: randomRange(29.68, 29.81), lng: randomRange(-95.45, -95.27)},

  // Dallas (5)
  {lat: randomRange(32.68562, 32.892273), lng: randomRange(-96.975623, -96.625448)},

  // Austin (6)
  {lat: randomRange(30.240086, 30.326064), lng: randomRange(-97.777971, -97.677726)},

  // Miami (7)
  {lat: randomRange(25.725065, 25.927172), lng: randomRange(-80.298374, -80.126681)},




  
]

export const USCities2: LocationType[] = [
  {lat: 39.983334, lng: -82.983330}, // Columbus
  {lat: 30.266666, lng: -97.733330}, // Austin
  {lat: 32.779167, lng: -96.808891}, // Dallas
  {lat: 29.749907, lng: -95.358421}, // Houston
  {lat: 39.983334, lng: -82.983330}, // Columbus
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