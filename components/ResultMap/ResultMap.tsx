/* eslint-disable react-hooks/exhaustive-deps */
import GoogleMapReact from 'google-map-react'
import { FC, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import { Marker } from '@components/Marker'
import { selectUser } from '@redux/user'
import { GuessType, LocationType } from '@types'
import {
  createPolyline,
  getMapTheme,
  getResultMapValuesV2
} from '@utils/helperFunctions'

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
  const user = useSelector(selectUser)

  useEffect(() => {
    if (!resultMapRef.current) return

    loadMapMarkers(resultMapRef.current, false)
  }, [guessedLocations, actualLocations])

  const loadMapMarkers = (map: google.maps.Map, isInitialCall: boolean) => {
    // Clear prev guess markers and polylines
    setGuessMarkers([])
    polylinesRef.current.map((polyline) => polyline.setMap(null))

    // Only set map center and zoom on mount, not on subsequent calls
    if (isInitialCall) {
      const { center, zoom } = getResultMapValuesV2(
        isFinalResults ? guessedLocations : [guessedLocation],
        isFinalResults ? actualLocations : [actualLocation],
        !!isFinalResults,
        !!isLeaderboard
      )

      map.setZoom(zoom)
      map.setCenter(center)
    }

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
            loadMapMarkers(map, true)
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
