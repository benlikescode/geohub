import { GameSettingsType, GuessType, LocationType } from '@types'

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
      { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
      { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
      { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }],
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }],
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{ color: '#263c3f' }],
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#6b9a76' }],
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#38414e' }],
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#212a37' }],
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#9ca5b3' }],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ color: '#746855' }],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#1f2835' }],
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#f3d19c' }],
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{ color: '#2f3948' }],
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }],
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#17263c' }],
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#515c6d' }],
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#17263c' }],
      },
    ]
  }

  if (theme === 'Hide') {
    return [
      {
        featureType: 'poi.business',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'transit',
        elementType: 'labels.icon',
        stylers: [{ visibility: 'off' }],
      },
    ]
  }

  if (theme === 'Retro') {
    return [
      { elementType: 'geometry', stylers: [{ color: '#ebe3cd' }] },
      { elementType: 'labels.text.fill', stylers: [{ color: '#523735' }] },
      { elementType: 'labels.text.stroke', stylers: [{ color: '#f5f1e6' }] },
      {
        featureType: 'administrative',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#c9b2a6' }],
      },
      {
        featureType: 'administrative.land_parcel',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#dcd2be' }],
      },
      {
        featureType: 'administrative.land_parcel',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#ae9e90' }],
      },
      {
        featureType: 'landscape.natural',
        elementType: 'geometry',
        stylers: [{ color: '#dfd2ae' }],
      },
      {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [{ color: '#dfd2ae' }],
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#93817c' }],
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry.fill',
        stylers: [{ color: '#a5b076' }],
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#447530' }],
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#f5f1e6' }],
      },
      {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [{ color: '#fdfcf8' }],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ color: '#f8c967' }],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#e9bc62' }],
      },
      {
        featureType: 'road.highway.controlled_access',
        elementType: 'geometry',
        stylers: [{ color: '#e98d58' }],
      },
      {
        featureType: 'road.highway.controlled_access',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#db8555' }],
      },
      {
        featureType: 'road.local',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#806b63' }],
      },
      {
        featureType: 'transit.line',
        elementType: 'geometry',
        stylers: [{ color: '#dfd2ae' }],
      },
      {
        featureType: 'transit.line',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#8f7d77' }],
      },
      {
        featureType: 'transit.line',
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#ebe3cd' }],
      },
      {
        featureType: 'transit.station',
        elementType: 'geometry',
        stylers: [{ color: '#dfd2ae' }],
      },
      {
        featureType: 'water',
        elementType: 'geometry.fill',
        stylers: [{ color: '#b9d3c2' }],
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#92998d' }],
      },
    ]
  }

  return []
}

// gets distance between guess and actual locations (in km)
export const getDistance = (loc1: GuessType, loc2: LocationType, format = false) => {
  const earthRadius = 6371.071

  const lat1Radians = loc1.lat * (Math.PI / 180)
  const lat2Radians = loc2.lat * (Math.PI / 180)

  const diffLat = lat2Radians - lat1Radians
  const diffLng = (loc2.lng - loc1.lng) * (Math.PI / 180)

  const distance =
    2 *
    earthRadius *
    Math.asin(
      Math.sqrt(
        Math.sin(diffLat / 2) * Math.sin(diffLat / 2) +
          Math.cos(lat1Radians) * Math.cos(lat2Radians) * Math.sin(diffLng / 2) * Math.sin(diffLng / 2)
      )
    )

  if (format) {
    if (distance < 1) {
      return `${Math.round(distance * 1000)} m`
    } else {
      return `${Math.round(distance)} km`
    }
  }

  return distance
}

// calculates the points based on distance away (works for official maps only as of now)
export const getPoints = (distance: number, mapId: string) => {
  const e = Math.E
  let mapFactor = 2000

  switch (mapId) {
    case 'world':
      mapFactor = 2000
      break
    case 'near-you':
      mapFactor = 30
      break
    case 'famous-landmarks':
      mapFactor = 20
      break
    case 'canada':
      mapFactor = 400
      break
    case 'usa':
      mapFactor = 1000
      break
    default:
      mapFactor = 2000
  }

  const power = (distance * -1) / mapFactor
  const score = 5000 * Math.pow(e, power)

  if (score < 0) {
    return 0
  }

  return Math.round(score)
}

export const getGuessMapDimensions = (size: number) => {
  if (size === 2) {
    return { width: 30, height: 40 }
  }
  if (size === 3) {
    return { width: 40, height: 55 }
  }
  if (size === 4) {
    return { width: 65, height: 80 }
  }
  return { width: 15, height: 15 }
}

export const getResultMapValues = (
  guessedLocation: GuessType,
  actualLocation: LocationType,
  isFinalResults = false
) => {
  let center = { lat: 0, lng: 0 }
  let zoom = 2

  if (!isFinalResults) {
    const distance = getDistance(guessedLocation, actualLocation)

    center = {
      lat: (actualLocation.lat + guessedLocation.lat) / 2,
      lng: (actualLocation.lng + guessedLocation.lng) / 2,
    }

    if (distance < 50) {
      zoom = 10
    }
    if (distance < 100) {
      zoom = 8
    } else if (distance < 500) {
      zoom = 7
    } else if (distance < 1200) {
      zoom = 6
    } else if (distance < 2000) {
      zoom = 5
    } else if (distance < 4000) {
      zoom = 4
    } else if (distance < 6000) {
      zoom = 4
    } else if (distance < 8000) {
      zoom = 3
    } else if (distance < 10000) {
      zoom = 3
    } else if (distance < 12000) {
      zoom = 2
    } else if (distance < 15000) {
      zoom = 2
    } else {
      zoom = 3
    }

    return { center, zoom }
  }
  // if we make it here, we are showing results for entire game
  // thus we can just return the default values of zoom = 2 and {lat = 0, lng = 0}
  return { center, zoom }
}

export const formatSettingsLabel = (settings: GameSettingsType) => {
  let formattedLabel = ''
  if (settings.timeLimit === 61 && settings.canMove && settings.canPan && settings.canZoom) {
    formattedLabel = 'Default Settings'
  } else {
    let time = ''
    if (settings.timeLimit === 61) {
      time = 'No time limit'
    } else {
      time = `${formatTimeLimit(settings.timeLimit)} per round`
    }

    formattedLabel = `
      ${time} - ${!settings.canMove ? 'No move' : ''} ${!settings.canPan ? '- No pan' : ''} ${
      !settings.canZoom ? '- No zoom' : ''
    }
    `
  }

  return formattedLabel
}

// sliderVal will be in range of 0 - 61
export const formatTimeLimit = (sliderVal: number) => {
  const time = Math.floor(sliderVal * 10)
  const mins = Math.floor(time / 60)
  const secs = Math.floor(time - mins * 60)

  if (secs === 0) {
    return `${mins}:${secs}0`
  }

  // replace 10:10 with infinity
  if (mins === 10 && secs === 10) {
    return '∞'
  }

  return `${mins}:${secs}`
}

export const formatTimer = (time: number) => {}

export const getResultData = (guess: GuessType, actual: LocationType, mapId: string) => {
  const distance = getDistance(guess, actual)
  const points = getPoints(distance as number, mapId)

  return { distance, points }
}

export const createMarker = (position: LocationType, map: google.maps.Map, markerImage: string) => {
  const image = {
    url: markerImage,
  }

  return new window.google.maps.Marker({
    position: position,
    map: map,
    icon: image,
  })
}

// takes in a single parameter distance (in km)
export const formatDistance = (distance: number) => {
  if (distance < 1) {
    return `${Math.round(distance * 1000)} m`
  }

  return `${Math.round(distance)} km`
}

// takes in single parameter time (in seconds)
export const formatRoundTime = (time: number) => {
  if (time < 60) {
    return `${time} sec`
  } else if (time < 3600) {
    const mins = Math.floor(time / 60)
    const secs = Math.floor(time - mins * 60)

    if (secs < 10) {
      return `${mins}:0${secs} min`
    }

    return `${mins}:${secs} min`
  } else {
    const hours = Math.floor(time / 3600)
    return `${hours} hr`
  }
}

// similar to above function (takes in time in seconds) except this
// is used in the gameStatus timer
export const formatTimeLeft = (time: number) => {
  const mins = Math.floor(time / 60)
  const secs = Math.floor(time - mins * 60)

  if (secs < 10) {
    return `${mins}:0${secs}`
  }

  return `${mins}:${secs}`
}

// Takes in a number and formats it if greater than 1000 (ex. 25000 -> 25k)
export const formatLargeNumber = (num: number) => {
  if (num >= 1000000) {
    const prefix = Math.floor(num / 1000000)
  }
  if (num >= 1000) {
  }
}

export const getMapName = (mapId: string) => {
  if (!mapId) return ''

  if (mapId.includes('-')) {
    const split = mapId.split('-')

    return capitalizeString(split[0]) + ' ' + capitalizeString(split[1])
  }

  return capitalizeString(mapId)
}

export const getMapSlug = (mapName: string) => {
  if (!mapName) return ''

  return mapName.split(' ').join('-').toLowerCase()
}

const capitalizeString = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// Takes in an array of locations and removes any duplicates
export const removeDuplicateLocations = (locations: LocationType[]) => {
  console.log(`Original locations length: ${locations.length}`)

  const seenLocations: LocationType[] = []
  const filteredLocations: LocationType[] = []

  locations.map((location, idx) => {
    let isDupe = false

    seenLocations.map((seenLocation) => {
      if (location.lat === seenLocation.lat && location.lng === seenLocation.lng) {
        isDupe = true
        console.log(`Duplicate at index ${idx}`)
      }
    })

    if (!isDupe) {
      filteredLocations.push(location)
    }

    seenLocations.push(location)
  })

  return filteredLocations
}
