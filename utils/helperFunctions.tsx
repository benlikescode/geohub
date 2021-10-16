import { GameSettingsType, LocationType } from "../types"

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
export const getDistance = (loc1: LocationType, loc2: LocationType, format = false) => {
  const earthRadius = 6371.0710

  const lat1Radians = loc1.lat * (Math.PI/180)
  const lat2Radians = loc2.lat * (Math.PI/180)

  const diffLat = lat2Radians - lat1Radians 
  const diffLng = (loc2.lng - loc1.lng) * (Math.PI/180)

  const distance = 2 * earthRadius * Math.asin(Math.sqrt(Math.sin(diffLat/2)*Math.sin(diffLat/2)+Math.cos(lat1Radians)*Math.cos(lat2Radians)*Math.sin(diffLng/2)*Math.sin(diffLng/2)))

  if (format) {
    if (distance < 1) {
      return `${Math.round(distance * 1000)} m`
    }
    else {
      return `${Math.round(distance)} km` 
    }
  }

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

export const getResultMapValues = (guessedLocation: LocationType, actualLocation: LocationType, isFinalResults = false) => {
  let center = {lat: 0, lng: 0}
  let zoom = 2

  if (!isFinalResults) {
    let distance = getDistance(guessedLocation, actualLocation)

    center = {
      lat: (actualLocation.lat + guessedLocation.lat) / 2,
      lng: (actualLocation.lng + guessedLocation.lng) / 2
    }

    if (distance < 50) {
      zoom = 10
    }
    if (distance < 100) {
      zoom = 8
    }
    else if (distance < 500) {
      zoom = 7
    }
    else if (distance < 1200) {
      zoom = 6
    }
    else if (distance < 2000) {
      zoom = 5
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
   
    return {center, zoom}
  }
  // if we make it here, we are showing results for entire game
  // thus we can just return the default values of zoom = 2 and {lat = 0, lng = 0}
  return {center, zoom}
}

// still have to add the rest of the cases here...
export const formatSettingsLabel = (settings: GameSettingsType) => {
  let formattedLabel = ''
  if (settings.timeLimit === 0 && settings.canMove && settings.canPan && settings.canZoom) {
    formattedLabel = 'Default Settings'
  }

  return formattedLabel
}

// sliderVal will be in range of 0 - 60
export const formatTimeLimit = (sliderVal: number) => {
  const time = Math.floor(sliderVal * 10)
  const mins = Math.floor(time / 60)
  const secs =  Math.floor(time - (mins * 60)) 

  if (secs === 0) {
    return `${mins}:${secs}0` 
  }

  // replace 10:10 with infinity
  if (mins === 10 && secs === 10) {
    return '∞'
  }

  return `${mins}:${secs}`
}

export const formatTimer = (time: number) => {
  
}