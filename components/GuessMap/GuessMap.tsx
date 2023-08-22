import GoogleMapReact from 'google-map-react'
import { FC, useEffect, useRef, useState } from 'react'
import { Marker } from '@components/Marker'
import { Button } from '@components/system'
import { ArrowRightIcon, XIcon } from '@heroicons/react/outline'
import { useAppSelector } from '@redux/hook'
import { GoogleMapsConfigType, LocationType } from '@types'
import { GUESS_MAP_OPTIONS } from '@utils/constants/googleMapOptions'
import useGuessMap from '@utils/hooks/useGuessMap'
import getMapsKey from '../../utils/helpers/getMapsKey'
import { StyledGuessMap } from './'

type Props = {
  currGuess: LocationType | null
  setCurrGuess: any
  mobileMapOpen?: boolean
  closeMobileMap: () => void
  handleSubmitGuess: () => void
  googleMapsConfig: GoogleMapsConfigType | undefined
  setGoogleMapsConfig: (googleMapsConfig: GoogleMapsConfigType) => void
  resetMap?: boolean
}

const GuessMap: FC<Props> = ({
  currGuess,
  setCurrGuess,
  mobileMapOpen,
  closeMobileMap,
  handleSubmitGuess,
  googleMapsConfig,
  setGoogleMapsConfig,
  resetMap,
}) => {
  const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(null)

  const {
    mapHeight,
    mapWidth,
    hovering,
    setHovering,
    setMapHeight,
    setMapWidth,
    handleMapHover,
    handleMapLeave,
    changeMapSize,
  } = useGuessMap()
  const user = useAppSelector((state) => state.user)

  useEffect(() => {
    handleSetupMap()
  }, [googleMapsConfig])

  useEffect(() => {
    handleResetMapState()
  }, [resetMap, googleMapsConfig])

  const handleSetupMap = () => {
    if (!googleMapsConfig) return

    const { map } = googleMapsConfig

    map.addListener('click', (e: google.maps.MapMouseEvent) => addMarker(e))
  }

  const handleResetMapState = () => {
    if (!resetMap || !googleMapsConfig) return

    const { map } = googleMapsConfig

    map.setCenter({ lat: 0, lng: 0 })
    map.setZoom(1)

    setHovering(false)
    setMapHeight(15)
    setMapWidth(15)
    setCurrGuess(null)
    setMarker(null)
    closeMobileMap()
  }

  const addMarker = (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return

    const location = { lat: e.latLng.lat(), lng: e.latLng.lng() }

    setCurrGuess(location)
    setMarker(location)
  }

  return (
    <StyledGuessMap mapHeight={mapHeight} mapWidth={mapWidth} mobileMapOpen={mobileMapOpen}>
      <div className="guessMapWrapper" onMouseOver={handleMapHover} onMouseLeave={handleMapLeave}>
        {hovering && (
          <div className="controls">
            <button
              className={`controlBtn increase ${user.guessMapSize === 4 ? 'disabled' : ''}`}
              onClick={() => changeMapSize('increase')}
              disabled={user.guessMapSize === 4}
            >
              <ArrowRightIcon />
            </button>

            <button
              className={`controlBtn decrease ${user.guessMapSize === 1 ? 'disabled' : ''}`}
              onClick={() => changeMapSize('decrease')}
              disabled={user.guessMapSize === 1}
            >
              <ArrowRightIcon />
            </button>
          </div>
        )}

        <div className="map">
          <GoogleMapReact
            bootstrapURLKeys={getMapsKey(user.mapsAPIKey)}
            defaultCenter={{ lat: 0, lng: 0 }}
            defaultZoom={1}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => setGoogleMapsConfig({ isLoaded: true, map, mapsApi: maps })}
            options={GUESS_MAP_OPTIONS}
          >
            {marker && (
              <Marker lat={marker.lat} lng={marker.lng} type="guess" userAvatar={user.avatar} isFinalResults={false} />
            )}
          </GoogleMapReact>
        </div>

        <button className="close-map-button" onClick={closeMobileMap}>
          <XIcon />
        </button>

        <div className="submit-button-wrapper">
          <Button width="100%" disabled={currGuess === null} onClick={() => handleSubmitGuess()}>
            Submit Guess
          </Button>
        </div>
      </div>
    </StyledGuessMap>
  )
}

export default GuessMap
