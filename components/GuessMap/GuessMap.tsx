import GoogleMapReact from 'google-map-react'
import { FC, useRef, useState } from 'react'
import { Marker } from '@components/Marker'
import { Button } from '@components/system'
import { ArrowRightIcon, XIcon } from '@heroicons/react/outline'
import { useAppDispatch, useAppSelector } from '@redux/hook'
import { updateGuessMapSize } from '@redux/slices'
import { LocationType } from '@types'
import { GUESS_MAP_OPTIONS } from '@utils/constants/googleMapOptions'
import { getGuessMapSize } from '@utils/helpers'
import getMapsKey from '../../utils/helpers/getMapsKey'
import { StyledGuessMap } from './'

type Props = {
  currGuess: LocationType | null
  setCurrGuess: any
  mobileMapOpen?: boolean
  closeMobileMap: () => void
  handleSubmitGuess: () => void
}

const GuessMap: FC<Props> = ({ currGuess, setCurrGuess, mobileMapOpen, closeMobileMap, handleSubmitGuess }) => {
  const [mapSize, setMapSize] = useState(getGuessMapSize(1))
  const [hovering, setHovering] = useState(false)
  const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(null)

  const dispatch = useAppDispatch()
  const hoverDelay = useRef<any>()
  const user = useAppSelector((state) => state.user)

  const handleMapHover = () => {
    clearInterval(hoverDelay.current)
    setHovering(true)
    setMapSize(getGuessMapSize(user.guessMapSize as number))
  }

  const handleMapLeave = () => {
    hoverDelay.current = setTimeout(() => {
      setHovering(false)
      setMapSize(getGuessMapSize(1))
    }, 700)
  }

  const changeMapSize = (change: 'increase' | 'decrease') => {
    let newMapSize = 1

    if (change === 'increase' && (user.guessMapSize as number) < 4) {
      newMapSize = (user.guessMapSize as number) + 1
    } else if (change === 'decrease' && (user.guessMapSize as number) > 1) {
      newMapSize = (user.guessMapSize as number) - 1
    }

    setMapSize(getGuessMapSize(newMapSize))

    dispatch(updateGuessMapSize({ guessMapSize: newMapSize }))
  }

  const addMarker = (e: any) => {
    const location = {
      lat: e.lat(),
      lng: e.lng(),
    }
    setCurrGuess(location)
    setMarker(location)
  }

  const onInit = (map: any, maps: any) => {
    maps.event.addListener(map, 'click', (e: any) => {
      addMarker(e.latLng)
    })
  }

  return (
    <StyledGuessMap mapSize={mapSize} mobileMapOpen={mobileMapOpen}>
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
