import GoogleMapReact from 'google-map-react'
import React, { FC, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Icon } from '@components/System'
import { Button } from '@components/System/Button'
import { ChevronDownIcon, ChevronUpIcon, XIcon } from '@heroicons/react/outline'
import { selectUser, updateGuessMapSize } from '@redux/user'
import { LocationType } from '@types'
import {
  createMarker,
  getGuessMapDimensions,
  getMapTheme
} from '@utils/helperFunctions'

import { StyledGuessMap } from './'

type Props = {
  coordinate: LocationType
  zoom: number
  currGuess: LocationType | null
  setCurrGuess: any
  mobileMapOpen?: boolean
  closeMobileMap: () => void
  handleSubmitGuess: () => void
}

const GuessMap: FC<Props> = ({
  coordinate,
  zoom,
  currGuess,
  setCurrGuess,
  mobileMapOpen,
  closeMobileMap,
  handleSubmitGuess,
}) => {
  const [mapHeight, setMapHeight] = useState(15) // height in vh
  const [mapWidth, setMapWidth] = useState(15) // width in vw
  const [hovering, setHovering] = useState(false)
  const prevMarkersRef = useRef<google.maps.Marker[]>([])
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const hoverDelay = useRef<any>()
  const googleKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string

  const GoogleMapConfig = {
    key: googleKey,
  }

  const handleApiLoaded = () => {
    const map = new window.google.maps.Map(document.getElementById('guessMap') as HTMLElement, {
      zoom: 2,
      center: { lat: 0, lng: 0 },
      disableDefaultUI: true,
      styles: getMapTheme('Light'),
      clickableIcons: false,
      gestureHandling: 'greedy',
    })

    clearMarkers(prevMarkersRef.current)

    window.google.maps.event.addListener(map, 'click', (e: any) => {
      const location = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      }
      setCurrGuess(location)

      const marker = createMarker(location, map, `/images/markers/testMarker2.png`)
      clearMarkers(prevMarkersRef.current)
      prevMarkersRef.current.push(marker)
    })
  }

  const clearMarkers = (markers: google.maps.Marker[]) => {
    markers.map((marker) => marker.setMap(null))
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
    }, 500)
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

  return (
    <StyledGuessMap mapHeight={mapHeight} mapWidth={mapWidth} mobileMapOpen={mobileMapOpen}>
      <div className="guessMapWrapper" onMouseOver={handleMapHover} onMouseLeave={handleMapLeave}>
        {hovering && (
          <div className="controls">
            <button
              className={`controlBtn ${user.guessMapSize === 4 ? 'disabled' : ''}`}
              onClick={() => changeMapSize('increase')}
              disabled={user.guessMapSize === 4}
            >
              <Icon size={16} fill="#fff">
                <ChevronUpIcon />
              </Icon>
            </button>

            <button
              className={`controlBtn ${user.guessMapSize === 1 ? 'disabled' : ''}`}
              onClick={() => changeMapSize('decrease')}
              disabled={user.guessMapSize === 1}
            >
              <Icon size={16} fill="#fff">
                <ChevronDownIcon />
              </Icon>
            </button>
          </div>
        )}
        <div id="guessMap" className="map"></div>

        <button className="close-map-button" onClick={closeMobileMap}>
          <XIcon />
        </button>

        <div className="submit-button-wrapper">
          <Button type="solidPurple" width="100%" isDisabled={currGuess === null} callback={handleSubmitGuess}>
            Submit Guess
          </Button>
        </div>
      </div>
      <GoogleMapReact
        bootstrapURLKeys={GoogleMapConfig}
        center={coordinate}
        zoom={zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={handleApiLoaded}
      >
        <div>HELLO WORLD</div>
      </GoogleMapReact>
    </StyledGuessMap>
  )
}

export default GuessMap
