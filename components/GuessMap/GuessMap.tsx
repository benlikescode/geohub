import React, { FC, useRef, useState } from 'react'
import { StyledGuessMap } from '.'
import GoogleMapReact from 'google-map-react'
import { Button } from '../System/Button'
import { useDispatch, useSelector } from 'react-redux'
import { createMarker, getGuessMapDimensions, getMapTheme } from '../../utils/helperFunctions'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline'
import { Icon } from '../System'
import { selectUser, updateGuessMapSize } from '../../redux/user'
import { mailman } from '../../backend/utils/mailman'
import { Game } from '../../backend/models'
import { LocationType } from '../../types'
import { selectGame } from '../../redux/game'

type Props = {
  coordinate: LocationType
  zoom: number
  setView: (view: 'Game' | 'Result' | 'FinalResults') => void
  gameData: Game
  setGameData: any
  currGuess: LocationType | null
  setCurrGuess: any
}

const GuessMap: FC<Props> = ({ coordinate, zoom, setView, gameData, setGameData, currGuess, setCurrGuess }) => {
  const [mapHeight, setMapHeight] = useState(15)
  const [mapWidth, setMapWidth] = useState(15)
  const [hovering, setHovering] = useState(false)
  const prevMarkersRef = useRef<google.maps.Marker[]>([])
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const game = useSelector(selectGame)
  const hoverDelay = useRef<any>()
  const googleKey = process.env.GOOGLE_API_KEY as string

  const GoogleMapConfig = {
    key: googleKey,
  }

  const handleApiLoaded = () => {
    const map = new window.google.maps.Map(
      document.getElementById("guessMap") as HTMLElement, {
        zoom: 2,
        center: { lat: 0, lng: 0 },
        disableDefaultUI: true,
        styles: getMapTheme('Light'),
        clickableIcons: false
      }   
    )

    clearMarkers(prevMarkersRef.current)

    window.google.maps.event.addListener(map, 'click', (e: any) => {
      const location = {
        lat: e.latLng.lat(), 
        lng: e.latLng.lng()
      }
      setCurrGuess(location)
      
      const marker = createMarker(location, map, user.avatar)
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

  const handleSubmitGuess = async () => {
    if (currGuess) {
      const body = {
        guess: currGuess,
        guessTime: (new Date().getTime() - game.startTime) / 1000,
        localRound: gameData.round,
        userLocation: user.location,
        timedOut: false,
        timedOutWithGuess: false
      }

      const { status, res } = await mailman(`games/${gameData.id}`, 'PUT', JSON.stringify(body))
      
      if (status !== 400 && status !== 500) {
        setGameData({id: res._id, ...res})
        setView('Result')
      }  
    } 
  }

  const changeMapSize = (change: 'increase' | 'decrease') => {
    if (change === 'increase' && user.guessMapSize < 4) { 
      dispatch(updateGuessMapSize({
        guessMapSize: user.guessMapSize + 1
      }))    
    }
    else if (change === 'decrease' && user.guessMapSize > 1) {
      dispatch(updateGuessMapSize({
        guessMapSize: user.guessMapSize - 1
      }))
    }
    handleMapHover()
  }

  return (
    <StyledGuessMap mapHeight={mapHeight} mapWidth={mapWidth}>
      <div className="guessMapWrapper" onMouseOver={handleMapHover} onMouseLeave={handleMapLeave}>
        {hovering &&
          <div className="controls">
            <button className={`controlBtn ${user.guessMapSize === 4 ? 'disabled' : ''}`} onClick={() => changeMapSize('increase')}>
              <Icon size={16} fill="#fff">
                <ChevronUpIcon />
              </Icon>
            </button>

            <button className={`controlBtn ${user.guessMapSize === 1 ? 'disabled' : ''}`} onClick={() => changeMapSize('decrease')}>
              <Icon size={16} fill="#fff">
                <ChevronDownIcon />
              </Icon>
            </button>
          </div>
        }
        <div id="guessMap" className="map"></div> 
          
        <Button 
          type="solidPurple" 
          width="100%" 
          isDisabled={currGuess === null}
          callback={handleSubmitGuess}
        >Submit Guess</Button> 
      </div>  
      <GoogleMapReact 
        bootstrapURLKeys={GoogleMapConfig}
        center={coordinate} 
        zoom={zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={handleApiLoaded}
      >
      </GoogleMapReact>
    </StyledGuessMap>
  )
}

export default GuessMap