import React, { FC, useRef, useState, useEffect } from 'react'
import { StyledGuessMap } from '.'
import GoogleMapReact from 'google-map-react'
import { Button } from '../System/Button'
import { useDispatch, useSelector } from 'react-redux'
import { createMarker, getGuessMapDimensions, getMapTheme } from '../../utils/helperFunctions'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline'
import { Icon } from '../System'
import { selectUser, updateGuessMapSize } from '../../redux/user'
import { LocationType } from '../../types'

type Props = {
  coordinate: LocationType
  zoom: number
  currGuess: LocationType | null
  setCurrGuess: any
  handleSubmitGuess: () => void
}

const GuessMap: FC<Props> = ({ coordinate, zoom, currGuess, setCurrGuess, handleSubmitGuess }) => {
  const [mapHeight, setMapHeight] = useState(15)
  const [mapWidth, setMapWidth] = useState(15)
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
    })

    clearMarkers(prevMarkersRef.current)

    window.google.maps.event.addListener(map, 'click', (e: any) => {
      const location = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      }
      setCurrGuess(location)

      const marker = createMarker(location, map, `/images/markers/${user.avatar}.png`)
      clearMarkers(prevMarkersRef.current)
      prevMarkersRef.current.push(marker)
    })
  }

  const clearMarkers = (markers: google.maps.Marker[]) => {
    for (let m of markers) {
      m.setMap(null)
    }
  }

  const handleMapHover = () => {
    clearInterval(hoverDelay.current)
    setHovering(true)
    const { width, height } = getGuessMapDimensions(user.guessMapSize)
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
    if (change === 'increase' && user.guessMapSize < 4) {
      dispatch(
        updateGuessMapSize({
          guessMapSize: user.guessMapSize + 1,
        }),
      )
    } else if (change === 'decrease' && user.guessMapSize > 1) {
      dispatch(
        updateGuessMapSize({
          guessMapSize: user.guessMapSize - 1,
        }),
      )
    }
    handleMapHover()
  }

  return (
    <StyledGuessMap mapHeight={mapHeight} mapWidth={mapWidth}>
      <div className="guessMapWrapper" onMouseOver={handleMapHover} onMouseLeave={handleMapLeave}>
        {hovering && (
          <div className="controls">
            <button
              className={`controlBtn ${user.guessMapSize === 4 ? 'disabled' : ''}`}
              onClick={() => changeMapSize('increase')}
            >
              <Icon size={16} fill="#fff">
                <ChevronUpIcon />
              </Icon>
            </button>

            <button
              className={`controlBtn ${user.guessMapSize === 1 ? 'disabled' : ''}`}
              onClick={() => changeMapSize('decrease')}
            >
              <Icon size={16} fill="#fff">
                <ChevronDownIcon />
              </Icon>
            </button>
          </div>
        )}
        <div id="guessMap" className="map"></div>

        <Button
          type="solidPurple"
          width="100%"
          isDisabled={currGuess === null}
          callback={handleSubmitGuess}
        >
          Submit Guess
        </Button>
      </div>
      <GoogleMapReact
        bootstrapURLKeys={GoogleMapConfig}
        center={coordinate}
        zoom={zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={handleApiLoaded}
      ></GoogleMapReact>
    </StyledGuessMap>
  )
}

export default GuessMap
