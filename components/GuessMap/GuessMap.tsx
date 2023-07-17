import GoogleMapReact from 'google-map-react'
import { FC, useEffect, useRef, useState } from 'react'
import { Marker } from '@components/Marker'
import { Button } from '@components/system'
import { ArrowRightIcon, XIcon } from '@heroicons/react/outline'
import { useAppSelector } from '@redux/hook'
import { LocationType } from '@types'
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
  setMapsApiLoaded: (mapsApiLoaded: boolean) => void
  resetMap?: boolean
}

const GuessMap: FC<Props> = ({
  currGuess,
  setCurrGuess,
  mobileMapOpen,
  closeMobileMap,
  handleSubmitGuess,
  setMapsApiLoaded,
  resetMap,
}) => {
  const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(null)

  const { mapHeight, mapWidth, hovering, handleMapHover, handleMapLeave, changeMapSize } = useGuessMap()

  const user = useAppSelector((state) => state.user)

  const mapRef = useRef<google.maps.Map | null>(null)

  const addMarker = (e: any) => {
    const location = {
      lat: e.lat(),
      lng: e.lng(),
    }
    setCurrGuess(location)
    setMarker(location)
  }

  const onInit = (map: any, maps: any) => {
    setMapsApiLoaded(true)
    console.log('gkahgkahkg')
    maps.event.addListener(map, 'click', (e: any) => {
      addMarker(e.latLng)
    })

    mapRef.current = map
  }

  useEffect(() => {
    if (resetMap && mapRef.current) {
      mapRef.current.setCenter({ lat: 0, lng: 0 })
      mapRef.current.setZoom(1)
      setCurrGuess(null)
      setMarker(null)
    }
  }, [resetMap])

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
            bootstrapURLKeys={{ key: getMapsKey(user.mapsAPIKey) }}
            defaultCenter={{ lat: 0, lng: 0 }}
            defaultZoom={1}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => onInit(map, maps)}
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
