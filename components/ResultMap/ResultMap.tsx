/* eslint-disable react-hooks/exhaustive-deps */
import GoogleMapReact from 'google-map-react'
import { FC, MutableRefObject, useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { Marker } from '@components/Marker'
import { useAppSelector } from '@redux/hook'
import { GoogleMapsConfigType, GuessType, LocationType } from '@types'
import { RESULT_MAP_OPTIONS } from '@utils/constants/googleMapOptions'
import { createMapMarker, createMapPolyline } from '@utils/helpers'
import getMapsKey from '../../utils/helpers/getMapsKey'
import { StyledResultMap } from './'

type Props = {
  guessedLocations: GuessType[]
  actualLocations: LocationType[]
  round: number
  isFinalResults?: boolean
  isLeaderboard?: boolean
  userAvatar?: { emoji: string; color: string }
  resetMap?: boolean
  googleMapsConfig: GoogleMapsConfigType | undefined
  polylinesRef: MutableRefObject<google.maps.Polyline[]>
  markersRef: MutableRefObject<google.maps.Marker[]>
  clearMapItems: () => void
}

const ResultMap: FC<Props> = ({
  guessedLocations,
  actualLocations,
  round,
  isFinalResults,
  isLeaderboard,
  userAvatar,
  resetMap,
  googleMapsConfig,
  polylinesRef,
  markersRef,
  clearMapItems,
}) => {
  const [guessMarkers, setGuessMarkers] = useState<GuessType[]>([])
  const [actualMarkers, setActualMarkers] = useState<LocationType[]>([])

  const guessedLocation = guessedLocations[guessedLocations.length - 1]
  const actualLocation = actualLocations[round - 2]
  const resultMapRef = useRef<HTMLDivElement | null>(null)

  const user = useAppSelector((state) => state.user)

  useEffect(() => {
    if (!googleMapsConfig || !resultMapRef.current) return

    const { map } = googleMapsConfig

    if (resetMap) {
      resultMapRef.current.append(googleMapsConfig.map.getDiv())

      map.addListener('click', () => null)
    }

    loadMapMarkersV2(map)
    getMapBounds(map)
  }, [resetMap, googleMapsConfig, resultMapRef])

  // If locations change (because we toggle the view on challenge results) -> reload the markers
  // useEffect(() => {
  //   if (!resultMapRef.current) return

  //   loadMapMarkers(resultMapRef.current)
  // }, [guessedLocations, actualLocations])

  // useEffect(() => {
  //   if (resetMap && resultMapRef.current) {
  //     loadMapMarkers(resultMapRef.current)
  //     getMapBounds(resultMapRef.current)
  //   }
  // }, [resetMap])

  const getMapBounds = (map: google.maps.Map) => {
    const bounds = new google.maps.LatLngBounds()

    // I do this weirdly because actual location is 1 location ahead of guessed...
    if (isFinalResults) {
      for (let i = 0; i < guessedLocations.length; i++) {
        bounds.extend(guessedLocations[i])
        bounds.extend(actualLocations[i])
      }
    } else {
      bounds.extend(guessedLocation)
      bounds.extend(actualLocation)
    }

    map.setCenter(bounds.getCenter())
    map.fitBounds(bounds)
  }

  const loadMapMarkersV2 = (map: google.maps.Map) => {
    clearMapItems()

    markersRef.current.push(
      createMapMarker(
        actualLocation,
        map,
        'https://e7.pngegg.com/pngimages/931/847/png-clipart-computer-icons-racing-flags-flag-miscellaneous-flag.png' +
          '#custom_marker'
      )
    )

    polylinesRef.current.push(createMapPolyline(guessedLocation, actualLocation, map))

    // createMapMarker(actualLocation, map, '/images/backgrounds/hero.jpg', 32)
    // const markerElement = document.createElement('div')
    // const customMarker = (
    //   <Marker
    //     type="guess"
    //     lat={guessedLocation.lat}
    //     lng={guessedLocation.lng}
    //     userAvatar={userAvatar ?? user.avatar}
    //     isFinalResults={!!isFinalResults}
    //   />
    // )
    // ReactDOM.render(customMarker, markerElement)

    // const googleMarker = new window.google.maps.Marker({
    //   position: { lat: guessedLocation.lat, lng: guessedLocation.lng },
    //   map: map,
    //   icon: {
    //     url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(markerElement.innerHTML),
    //     scaledSize: new window.google.maps.Size(30, 30),
    //   },
    // })

    // const markerElement = document.createElement('div')
    // markerElement.innerHTML = `<div style="background-color: blue; color: white; padding: 5px;">YOOOOOOOOOO</div>`

    // const googleMarker2 = new window.google.maps.Marker({
    //   position: { lat: actualLocation.lat, lng: actualLocation.lng },
    //   map: map,
    //   icon: {
    //     url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(markerElement.innerHTML),
    //     scaledSize: new window.google.maps.Size(30, 30),
    //   },
    // })
  }

  const loadMapMarkers = (map: google.maps.Map) => {
    // Clear prev guess markers and polylines
    setGuessMarkers([])
    polylinesRef.current.map((polyline) => polyline.setMap(null))

    // Set map markers and polylines
    if (isFinalResults) {
      setGuessMarkers(guessedLocations)
      setActualMarkers(actualLocations)

      for (let i = 0; i < actualLocations.length; i++) {
        const polyline = createMapPolyline(guessedLocations[i], actualLocations[i], map)
        polylinesRef.current.push(polyline)
      }
    } else {
      setGuessMarkers([guessedLocation])
      setActualMarkers([actualLocation])

      const polyline = createMapPolyline(guessedLocation, actualLocation, map)
      polylinesRef.current.push(polyline)
    }
  }

  return (
    <StyledResultMap>
      <div className="map" ref={resultMapRef}>
        {guessMarkers.map((marker, idx) => (
          <Marker
            key={idx}
            type="guess"
            lat={marker.lat}
            lng={marker.lng}
            userAvatar={userAvatar ?? user.avatar}
            isFinalResults={!!isFinalResults}
          />
        ))}

        {actualMarkers.map((marker, idx) => (
          <Marker
            key={idx}
            type="actual"
            lat={marker.lat}
            lng={marker.lng}
            roundNumber={idx + 1}
            isFinalResults={!!isFinalResults}
          />
        ))}
      </div>
    </StyledResultMap>
  )
}
export default ResultMap
