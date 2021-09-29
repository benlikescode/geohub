import { LocationType } from "../types"

export const helloWorld = () => {
  console.log("Hello World")
}

export const formatErrorMessage = (error: any) => {
  let formattedMsg = ''
  
  switch (error.code) {
    case 'auth/user-not-found':
      formattedMsg = 'That email and password combination is incorrect.'
      break
    case 'auth/wrong-password':
      formattedMsg = 'That email and password combination is incorrect.'
      break
    case 'auth/invalid-email':
      formattedMsg = 'Please enter a valid email.'
      break
    default:
      formattedMsg = 'An unknown error occured. Please wait and try again.' + error.message
  }

  return formattedMsg
}

export const generateLocations = (map: string, numLocations = 5) => {
  const locations: LocationType[] = []

  for (let i = 0; i < numLocations; i++) {
    locations.push({
      lat: (i + 10) * 2, 
      lng: (i + 10) * 3
    })
  }

  return locations

}

// lat 34 => 42
// lng -120 => -80
export const generateUS = (numLocations = 5) => {
  const locations: LocationType[] = []

  for (let i = 0; i < numLocations; i++) {
    locations.push({
      lat: randomRange(34, 42),
      lng: randomRange(-120, -80)
    })
  }

  return locations
}

export const randomRange = (min = 0, max = 100) => { 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const testLocation = () => {
  const locations = [
    {lat: 35.77289217620601, lng: -85.09555176667031},
    {lat: 35.9128264152442, lng: -87.61140660553662},
    {lat: 36.24188381208464, lng: -88.28262971203432},
    {lat: 36.56128686060616, lng: -91.12202786978625},
    {lat: 37.17057338007954, lng: -92.55305293592208},
  ]
  return locations[Math.floor(Math.random() * locations.length)]
}