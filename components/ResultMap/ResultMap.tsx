/* eslint-disable react-hooks/exhaustive-deps */
import GoogleMapReact from 'google-map-react'
import { FC, useEffect, useRef, useState } from 'react'
import { Marker } from '@components/Marker'
import { useAppSelector } from '@redux/hook'
import { GuessType, LocationType } from '@types'
import { createPolyline, getMapTheme } from '@utils/helperFunctions'
import { StyledResultMap } from './'

type Props = {
  guessedLocations: GuessType[]
  actualLocations: LocationType[]
  round: number
  isFinalResults?: boolean
  isLeaderboard?: boolean
  userAvatar?: { emoji: string; color: string }
}

const ResultMap: FC<Props> = ({
  guessedLocations,
  actualLocations,
  round,
  isFinalResults,
  isLeaderboard,
  userAvatar,
}) => {
  const [guessMarkers, setGuessMarkers] = useState<GuessType[]>([])
  const [actualMarkers, setActualMarkers] = useState<LocationType[]>([])

  const guessedLocation = guessedLocations[guessedLocations.length - 1]
  const actualLocation = actualLocations[round - 2]
  const resultMapRef = useRef<google.maps.Map | null>(null)
  const polylinesRef = useRef<google.maps.Polyline[]>([])
  const user = useAppSelector((state) => state.user)

  // If locations change (because we toggle the view on challenge results) -> reload the markers
  useEffect(() => {
    if (!resultMapRef.current) return

    loadMapMarkers(resultMapRef.current)
  }, [guessedLocations, actualLocations])

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

  const loadMapMarkers = (map: google.maps.Map) => {
    // Clear prev guess markers and polylines
    setGuessMarkers([])
    polylinesRef.current.map((polyline) => polyline.setMap(null))

    // Set map markers and polylines
    if (isFinalResults) {
      setGuessMarkers(guessedLocations)
      setActualMarkers(actualLocations)

      for (let i = 0; i < actualLocations.length; i++) {
        const polyline = createPolyline(guessedLocations[i], actualLocations[i], map)
        polylinesRef.current.push(polyline)
      }
    } else {
      setGuessMarkers([guessedLocation])
      setActualMarkers([actualLocation])

      const polyline = createPolyline(guessedLocation, actualLocation, map)
      polylinesRef.current.push(polyline)
    }
  }

  return (
    <StyledResultMap>
      <div className="map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string }}
          center={{ lat: 0, lng: 0 }}
          zoom={2}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map }) => {
            loadMapMarkers(map)
            getMapBounds(map)
            resultMapRef.current = map
          }}
          options={{
            styles: getMapTheme('Light'),
            clickableIcons: false,
            minZoom: 2,
            disableDefaultUI: true,
            gestureHandling: 'greedy',
          }}
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
