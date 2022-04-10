import React, { createRef, FC, useEffect, useRef, useState } from 'react'
import { StyledNewGuessMap } from '.'
import mapboxgl from 'mapbox-gl'
import { LocationType } from '../../types'
import { Button } from '../System'
import { Game } from '../../backend/models'
import { mailman } from '../../backend/utils/mailman'
import { useDispatch, useSelector } from 'react-redux'
import { selectGame } from '../../redux/game'
import { selectUser, updateGuessMapSize } from '../../redux/user'
import { getGuessMapDimensions } from '../../utils/helperFunctions'

type Props = {
  currGuess: LocationType | null;
  setCurrGuess: any;
  gameMode: 'normal' | 'aerial';
  gameData: Game;
  setGameData: any;
  setView: (view: 'Game' | 'Result' | 'FinalResults') => void;
}

const NewGuessMap: FC<Props> = ({ currGuess, setCurrGuess, gameMode, gameData, setGameData, setView }) => {
  mapboxgl.accessToken = 'pk.eyJ1IjoiYmVubGlrZXNjb2RlIiwiYSI6ImNsMXFxbXAwYjFxNjMzZW1tazQ5N21jZTgifQ.bt9S5fzwugjjnZT0eR_wnQ'
  const guessMap = useRef<any>()
  const mapRef = useRef<any>()
  const [lat, setLat] = useState(0)
  const [lng, setLng] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [mapHeight, setMapHeight] = useState(25)
  const [mapWidth, setMapWidth] = useState(25)
  const [hovering, setHovering] = useState(false)
  const hoverDelay = useRef<any>()
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const game = useSelector(selectGame)
  //const markerRef = createRef()
  const prevMarkersRef = useRef<mapboxgl.Marker[]>([])

  useEffect(() => {
    if (mapRef.current) return 

    mapRef.current = new mapboxgl.Map({
      container: guessMap.current as HTMLElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
      attributionControl: false,
      dragRotate: false,
    })
  }, [])

  useEffect(() => {
    if (!mapRef.current) return

    mapRef.current.on('click', (e: mapboxgl.MapMouseEvent) => {
      const clickedLat = e.lngLat.lat
      const clickedLng = e.lngLat.lng

      setCurrGuess({lat: clickedLat, lng: clickedLng})

      setLat(clickedLat)
      setLng(clickedLng)

      const marker = new mapboxgl.Marker().setLngLat([clickedLng, clickedLat]).addTo(mapRef.current)

      prevMarkersRef.current.map(m => m.remove())
      prevMarkersRef.current.push(marker)
    })
  })

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

      const { status, res } = await mailman(`${gameMode === 'normal' ? 'games' : gameMode}/${gameData.id}`, 'PUT', JSON.stringify(body))
      
      if (status !== 400 && status !== 500) {
        setGameData({id: res._id, ...res})
        setView('Result')
      }  
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
    <StyledNewGuessMap mapHeight={mapHeight} mapWidth={mapWidth}>
      <div className="guessMap" ref={guessMap}></div>
      <Button 
        type="solidGray" 
        width="100%" 
        isDisabled={currGuess === null}
        callback={handleSubmitGuess}
      >
        Submit Guess
      </Button> 
    </StyledNewGuessMap>
  )
}

export default NewGuessMap