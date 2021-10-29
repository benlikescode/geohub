import React, { FC, useEffect, useRef, useState } from 'react'
import { StyledMap2 } from '.'
import GoogleMapReact from 'google-map-react'
import { GuessType, LocationType } from '../../types'
import Marker from 'google-map-react'
import { Button } from '../System/Button'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { getGuessMapDimensions, getMapTheme, getResultData } from '../../utils/helperFunctions'
import { ChevronDownIcon, ChevronUpIcon, LocationMarkerIcon } from '@heroicons/react/outline'
import { Icon } from '../System'
import { selectUser, updateGuessMapSize } from '../../redux/user'
import { mailman } from '../../backend/utils/mailman'
import { selectGameNew, updateView } from '../../redux/gameNew'
import { addGuess } from '../../redux/gameNew'
import { Game } from '../../backend/models'

type Props = {
  coordinate: LocationType
  zoom: number
  setView: (view: 'Game' | 'Result' | 'FinalResults') => void
  gameData: Game
  setGameData: any
}

const Map2: FC<Props> = ({ coordinate, zoom, setView, gameData, setGameData }) => {
  const [mapHeight, setMapHeight] = useState(15)
  const [mapWidth, setMapWidth] = useState(15)
  const [hovering, setHovering] = useState(false)
  const prevMarkersRef = useRef<google.maps.Marker[]>([])
  const dispatch = useDispatch()
  const gameNew = useSelector(selectGameNew)
  const user = useSelector(selectUser)
  const hoverDelay = useRef<any>()
  const [currGuess, setCurrGuess] = useState<LocationType | null>(null)

  const googleKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string

  const GoogleMapConfig = {
    key: googleKey,
  }

  const handleApiLoaded = () => {
    const map = new window.google.maps.Map(
      document.getElementById("guessMap") as HTMLElement, {
        zoom: 2,
        center: { lat: 0, lng: 0 },
        disableDefaultUI: true,
        styles: getMapTheme('Light')
      }   
    )

    clearMarkers(prevMarkersRef.current)

    window.google.maps.event.addListener(map, 'click', (e: any) => {
      const location = {
        lat: e.latLng.lat(), 
        lng: e.latLng.lng()
      }
      setCurrGuess(location)
      
      const marker = createMarker(location, map)
      clearMarkers(prevMarkersRef.current)
      prevMarkersRef.current.push(marker)
    })
  }

  const createMarker = (position: LocationType, map: google.maps.Map) => {
    const image = {
      url: "https://www.geoguessr.com/images/auto/30/30/ce/0/plain/pin/c2fe16562d9ad321687532d53b067e75.png",
      size: new google.maps.Size(30, 30),
    }

    const svgMarker = {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: 'blue',
      fillOpacity: 0.6,
      strokeWeight: 0,
      rotation: 0,
      scale: 2,
      anchor: new google.maps.Point(15, 30),
    }

    return new window.google.maps.Marker({
      position: position,
      map: map,
      icon: image
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
        localRound: gameData.round
      }

      const { status, res } = await mailman(`games/${gameData.id}`, 'PUT', JSON.stringify(body))
      
      if (status !== 400 && status !== 500) {
        setGameData(res)
        setView('Result')
      }  
    } 
  }

  const changeMapSize = (change: 'increase' | 'decrease') => {
    if (change === 'increase') {
      dispatch(updateGuessMapSize({
        guessMapSize: user.guessMapSize + 1
      }))
    }
    else {
      dispatch(updateGuessMapSize({
        guessMapSize: user.guessMapSize - 1
      }))
    }
    handleMapHover()
  }

  return (
    <StyledMap2 mapHeight={mapHeight} mapWidth={mapWidth}>
      <div className="guessMapWrapper" onMouseOver={handleMapHover} onMouseLeave={handleMapLeave}>
      {hovering &&
          <div className="controls">
            <button className="controlBtn" onClick={() => changeMapSize('increase')}>
              <Icon size={16} fill="#fff">
                <ChevronUpIcon />
              </Icon>
            </button>

            <button className="controlBtn" onClick={() => changeMapSize('decrease')}>
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
    </StyledMap2>
  )
}

export default Map2