import { GameSettingsType, LocationType } from "../types"

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

export const getMapTheme = (theme: string) => {
  if (theme === 'Dark') {
    return [
      { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#263c3f" }],
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#6b9a76" }],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }],
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }],
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#746855" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1f2835" }],
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f3d19c" }],
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#2f3948" }],
      },
      {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }],
      },
    ]
  }

  if (theme === 'Hide') {
    return [
      {
        featureType: "poi.business",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "transit",
        elementType: "labels.icon",
        stylers: [{ visibility: "off" }],
      },
    ]
  }

  if (theme === 'Retro') {
    return [
      { elementType: "geometry", stylers: [{ color: "#ebe3cd" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#523735" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#f5f1e6" }] },
      {
        featureType: "administrative",
        elementType: "geometry.stroke",
        stylers: [{ color: "#c9b2a6" }],
      },
      {
        featureType: "administrative.land_parcel",
        elementType: "geometry.stroke",
        stylers: [{ color: "#dcd2be" }],
      },
      {
        featureType: "administrative.land_parcel",
        elementType: "labels.text.fill",
        stylers: [{ color: "#ae9e90" }],
      },
      {
        featureType: "landscape.natural",
        elementType: "geometry",
        stylers: [{ color: "#dfd2ae" }],
      },
      {
        featureType: "poi",
        elementType: "geometry",
        stylers: [{ color: "#dfd2ae" }],
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#93817c" }],
      },
      {
        featureType: "poi.park",
        elementType: "geometry.fill",
        stylers: [{ color: "#a5b076" }],
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#447530" }],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#f5f1e6" }],
      },
      {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [{ color: "#fdfcf8" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#f8c967" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#e9bc62" }],
      },
      {
        featureType: "road.highway.controlled_access",
        elementType: "geometry",
        stylers: [{ color: "#e98d58" }],
      },
      {
        featureType: "road.highway.controlled_access",
        elementType: "geometry.stroke",
        stylers: [{ color: "#db8555" }],
      },
      {
        featureType: "road.local",
        elementType: "labels.text.fill",
        stylers: [{ color: "#806b63" }],
      },
      {
        featureType: "transit.line",
        elementType: "geometry",
        stylers: [{ color: "#dfd2ae" }],
      },
      {
        featureType: "transit.line",
        elementType: "labels.text.fill",
        stylers: [{ color: "#8f7d77" }],
      },
      {
        featureType: "transit.line",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#ebe3cd" }],
      },
      {
        featureType: "transit.station",
        elementType: "geometry",
        stylers: [{ color: "#dfd2ae" }],
      },
      {
        featureType: "water",
        elementType: "geometry.fill",
        stylers: [{ color: "#b9d3c2" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#92998d" }],
      },
    ]
  }

  return []
}

// gets distance between guess and actual locations (in km)
export const getDistance = (loc1: LocationType, loc2: LocationType) => {
  const earthRadius = 6371.0710

  const lat1Radians = loc1.lat * (Math.PI/180)
  const lat2Radians = loc2.lat * (Math.PI/180)

  const diffLat = lat2Radians - lat1Radians 
  const diffLng = (loc2.lng - loc1.lng) * (Math.PI/180)

  const distance = 2 * earthRadius * Math.asin(Math.sqrt(Math.sin(diffLat/2)*Math.sin(diffLat/2)+Math.cos(lat1Radians)*Math.cos(lat2Radians)*Math.sin(diffLng/2)*Math.sin(diffLng/2)))
  return Math.round(distance)
}

// calculates the points based on distance away => NOTE: this will need to be refined heavily later on to account for smaller maps
// this works pretty well for the world tho
export const getPoints = (distance: number) => {
  const e = Math.E
  const power = (distance * -1) / 2000
  const score = 5000 * Math.pow(e, power)

  if (score < 0) {
    return 0
  }

  return Math.round(score)
}

export const getGuessMapDimensions = (size: number) => {
  if (size === 2) {
    return { width: 500, height: 300 }
  }
  if (size === 3) {
    return { width: 600, height: 400 }
  }
  if (size === 4) {
    return { width: 800, height: 500 }
  }
  return { width: 400, height: 250 }
}

export const getResultMapValues = (guessedLocations: LocationType[], actualLocations: LocationType[]) => {
  let center: LocationType = {lat: 0, lng: 0}
  let zoom = 2

  // if we are showing results of 1 round
  if (actualLocations.length === 1) {
    const guessedLocation = guessedLocations[0]
    const actualLocation = actualLocations[0]

    let distance = getDistance(guessedLocation, actualLocation)
    if (distance >= 15000) {
      actualLocation.lng = actualLocation.lng - 360
    }
    console.log("HERE")
    console.log(distance)

    center = {
      lat: (actualLocation.lat + guessedLocation.lat) / 2,
      lng: (actualLocation.lng + guessedLocation.lng) / 2
    }

    if (distance < 2000) {
      zoom = 6
    }
    else if (distance < 4000) {
      zoom = 4
    }
    else if (distance < 6000) {
      zoom = 4
    }
    else if (distance < 8000) {
      zoom = 3
    }
    else if (distance < 10000) {
      zoom = 3
    }
    else if (distance < 12000) {
      zoom = 2
    }
    else if (distance < 15000) {
      zoom = 2
    }
    else {
      zoom = 3
    }
    console.log(guessedLocation)
    console.log(actualLocation)
    console.log(center)

    return {center, zoom}

  }
  // if we make it here, we are showing results for entire game
  // thus we can just return the default values of zoom = 2 and {lat = 0, lng = 0}
  console.log(zoom)
  return {center, zoom}
}

export const formatSettingsLabel = (settings: GameSettingsType) => {
  let formattedLabel = ''
  if (settings.timeLimit === 0 && settings.canMove && settings.canPan && settings.canZoom) {
    formattedLabel = 'Default Settings'
  }

  return formattedLabel
}