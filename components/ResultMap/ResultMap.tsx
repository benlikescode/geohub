/* eslint-disable react-hooks/exhaustive-deps */
import GoogleMapReact from 'google-map-react'
import { FC, useEffect, useRef, useState } from 'react'
import { Marker } from '@components/Marker'
import { useAppSelector } from '@redux/hook'
import { GuessType, LocationType } from '@types'
import { RESULT_MAP_OPTIONS } from '@utils/constants/googleMapOptions'
import { createMapPolyline } from '@utils/helpers'
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
}

const ResultMap: FC<Props> = ({
  guessedLocations,
  actualLocations,
  round,
  isFinalResults,
  isLeaderboard,
  userAvatar,
  resetMap,
}) => {
  const [guessMarkers, setGuessMarkers] = useState<GuessType[]>([])
  const [actualMarkers, setActualMarkers] = useState<LocationType[]>([])

  const resultMapRef = useRef<google.maps.Map | null>(null)
  const polylinesRef = useRef<google.maps.Polyline[]>([])
  const user = useAppSelector((state) => state.user)

  // If locations change (because we toggle the view on challenge results) -> reload the markers
  useEffect(() => {
    if (!resultMapRef.current || !guessedLocations.length) return

    loadMapMarkers(resultMapRef.current)
  }, [guessedLocations, actualLocations])

  useEffect(() => {
    if (resetMap && resultMapRef.current && guessedLocations.length > 0) {
      loadMapMarkers(resultMapRef.current)
      getMapBounds(resultMapRef.current)
    }
  }, [resetMap, isFinalResults])

  const getMapBounds = (map: google.maps.Map) => {
    const guessedLocation = guessedLocations[guessedLocations.length - 1]
    const actualLocation = actualLocations[round - 2]

    const bounds = new google.maps.LatLngBounds()

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
    map.fitBounds(bounds, { bottom: 20 })
  }

  const loadMapMarkers = (map: google.maps.Map) => {
    const guessedLocation = guessedLocations[guessedLocations.length - 1]
    const actualLocation = actualLocations[round - 2]

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
      <div className="map">
        <GoogleMapReact
          bootstrapURLKeys={getMapsKey(user.mapsAPIKey)}
          center={{ lat: 0, lng: 0 }}
          zoom={2}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map }) => {
            loadMapMarkers(map)
            getMapBounds(map)
            resultMapRef.current = map
          }}
          options={RESULT_MAP_OPTIONS}
        >
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
        </GoogleMapReact>
      </div>
    </StyledResultMap>
  )
}
export default ResultMap
