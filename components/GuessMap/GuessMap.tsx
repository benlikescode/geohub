import GoogleMapReact from 'google-map-react'
import { FC, useRef, useState } from 'react'
import { Marker } from '@components/Marker'
import { Button } from '@components/System/Button'
import { ArrowRightIcon, XIcon } from '@heroicons/react/outline'
import { useAppDispatch, useAppSelector } from '@redux/hook'
import { updateGuessMapSize } from '@redux/slices'
import { LocationType } from '@types'
import { getGuessMapDimensions, getMapTheme } from '@utils/helperFunctions'
import { StyledGuessMap } from './'

type Props = {
  currGuess: LocationType | null
  setCurrGuess: any
  mobileMapOpen?: boolean
  closeMobileMap: () => void
  handleSubmitGuess: () => void
}

const GuessMap: FC<Props> = ({ currGuess, setCurrGuess, mobileMapOpen, closeMobileMap, handleSubmitGuess }) => {
  const [mapHeight, setMapHeight] = useState(15) // height in vh
  const [mapWidth, setMapWidth] = useState(15) // width in vw
  const [hovering, setHovering] = useState(false)
  const dispatch = useAppDispatch()
  const hoverDelay = useRef<any>()
  const googleKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string
  const user = useAppSelector((state) => state.user)

  const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(null)

  const GoogleMapConfig = {
    key: googleKey,
  }

  const handleMapHover = () => {
    clearInterval(hoverDelay.current)
    setHovering(true)

    const { width, height } = getGuessMapDimensions(user.guessMapSize as number)
    setMapHeight(height)
    setMapWidth(width)
  }

  const handleMapLeave = () => {
    hoverDelay.current = setTimeout(() => {
      setHovering(false)
      setMapHeight(15)
      setMapWidth(15)
    }, 700)
  }

  const changeMapSize = (change: 'increase' | 'decrease') => {
    let newMapSize = 1

    if (change === 'increase' && (user.guessMapSize as number) < 4) {
      newMapSize = (user.guessMapSize as number) + 1
    } else if (change === 'decrease' && (user.guessMapSize as number) > 1) {
      newMapSize = (user.guessMapSize as number) - 1
    }

    const { width, height } = getGuessMapDimensions(newMapSize)
    setMapHeight(height)
    setMapWidth(width)

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
            bootstrapURLKeys={GoogleMapConfig}
            defaultCenter={{ lat: 0, lng: 0 }}
            defaultZoom={1}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => onInit(map, maps)}
            options={{
              disableDefaultUI: true,
              styles: getMapTheme('Light'),
              clickableIcons: false,
              gestureHandling: 'greedy',
              minZoom: 1,
              draggableCursor: 'crosshair',
            }}
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
