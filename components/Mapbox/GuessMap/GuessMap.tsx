/* eslint-disable @next/next/no-img-element */
import React, { FC, useState } from 'react'
import { StyledGuessMap } from '.'
import Map, { Marker } from 'react-map-gl'
import { LocationType } from '../../../types'
import { Button } from '../../System'
import { Game } from '../../../backend/models'
import { mailman } from '../../../backend/utils/mailman'
import { useSelector } from 'react-redux'
import { selectGame } from '../../../redux/game'
import { selectUser } from '../../../redux/user'
import mapboxgl from 'mapbox-gl'

type Props = {
  currGuess: LocationType | null;
  setCurrGuess: any;
  gameMode: 'normal' | 'aerial';
  gameData: Game;
  setGameData: any;
  setView: (view: 'Game' | 'Result' | 'FinalResults') => void;
}

const GuessMap: FC<Props> = ({ currGuess, setCurrGuess, gameMode, gameData, setGameData, setView }) => {
  const [lat, setLat] = useState(0)
  const [lng, setLng] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [marker, setMarker] = useState<any>()
  const user = useSelector(selectUser)
  const game = useSelector(selectGame)

  const handleMapClick = (e: mapboxgl.MapLayerMouseEvent) => {
    const clickedLat = e.lngLat.lat
    const clickedLng = e.lngLat.lng

    setCurrGuess({lat: clickedLat, lng: clickedLng})
    setLat(clickedLat)
    setLng(clickedLng)

    setMarker(
      <Marker longitude={clickedLng} latitude={clickedLat}>
        <img className="userMarker" src={`/images/avatars/default3.jpg`} alt="User Map Pin" />
      </Marker>
    )
  }

  const handleSubmitGuess = async () => {
    if (currGuess) {
      let body = {}

      if (gameMode === 'aerial') {
        body = {
          guess: currGuess,
          guessTime: (new Date().getTime() - game.startTime) / 1000,
          localRound: gameData.round,
          userLocation: user.location,
          timedOut: false,
          timedOutWithGuess: false,
          difficulty: gameData.difficulty,
          countryCode: gameData.countryCode
        }
      }

      if (gameMode === 'normal') {
        body = {
          guess: currGuess,
          guessTime: (new Date().getTime() - game.startTime) / 1000,
          localRound: gameData.round,
          userLocation: user.location,
          timedOut: false,
          timedOutWithGuess: false,
        }
      }
      
      const { status, res } = await mailman(`${gameMode === 'normal' ? 'games' : gameMode}/${gameData.id}`, 'PUT', JSON.stringify(body))
      
      if (status !== 400 && status !== 500) {
        setGameData({id: res._id, ...res})
        setCurrGuess(null)
        setView('Result')
      }  
    } 
  }

  return (
    <StyledGuessMap>
      <Map
        initialViewState={{ longitude: lng, latitude: lat, zoom }}
        style={{
          height: `25vh`, 
          width: `25vw`,
          borderRadius: '4px',
        }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        dragRotate={false}
        attributionControl={false}
        onClick={(e) => handleMapClick(e)}
      >
        {marker}
      </Map>
      <Button 
        type="solidGray" 
        width="100%" 
        isDisabled={currGuess === null}
        callback={handleSubmitGuess}
      >
        Submit Guess
      </Button> 
    </StyledGuessMap>
  )
}

export default GuessMap