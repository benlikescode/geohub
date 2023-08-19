import { GuessType, LocationType } from '../../@types'

const createPolyline = (guessedLocation: GuessType, actualLocation: LocationType, map: google.maps.Map) => {
  const lineSymbol = {
    path: 'M 0,-1 0,1',
    strokeOpacity: 1,
    scale: 1.75,
  }

  return new google.maps.Polyline({
    path: [guessedLocation, actualLocation],
    map: map,
    clickable: false,
    strokeOpacity: 0,
    icons: [{ icon: lineSymbol, offset: '30px', repeat: '7px' }],
  })
}

export default createPolyline
