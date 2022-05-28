import React, { FC, useEffect, useState } from 'react'
import { StyledStreetView } from '.'
import GoogleMapReact from 'google-map-react'
import { StreetViewControls } from '../StreetViewControls'
import { GameStatus } from '../GameStatus'
import { GuessMap } from '../GuessMap'
import { Game } from '../../backend/models'
import { LoadingPage } from '../Layout'
import { LocationType } from '../../types'
import { selectGame } from '../../redux/game'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/user'
import { mailman } from '../../backend/utils/mailman'
import { KEY_CODES } from '../../utils/constants/keyCodes'

type Props = {
  gameData: Game
  setView: (view: 'Game' | 'Result' | 'FinalResults') => void
  setGameData: any
}

const StreetView: FC<Props> = ({ gameData, setView, setGameData }) => {
  const [loading, setLoading] = useState(true)
  const [currGuess, setCurrGuess] = useState<LocationType | null>(null)
  const location = gameData.rounds[gameData.round - 1]
  const googleKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string
  const game = useSelector(selectGame)
  const user = useSelector(selectUser)

  const GoogleMapConfig = {
    key: googleKey,
  }

  const handleSubmitGuess = async () => {
    if (currGuess) {
      const body = {
        guess: currGuess,
        guessTime: (new Date().getTime() - game.startTime) / 1000,
        localRound: gameData.round,
        userLocation: user.location,
        timedOut: false,
        timedOutWithGuess: false,
      }

      const { status, res } = await mailman(`games/${gameData.id}`, 'PUT', JSON.stringify(body))

      if (status !== 400 && status !== 500) {
        setGameData({ id: res._id, ...res })
        setView('Result')
      }
    }
  }

  const handleKeyDown = async (e: KeyboardEvent) => {
    if (e.key === KEY_CODES.SPACE || e.key === KEY_CODES.SPACE_IE11 || e.key === KEY_CODES.ENTER) {
      await handleSubmitGuess()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [currGuess])

  const handleApiLoaded = (map: any, maps: any) => {
    var sv = new window.google.maps.StreetViewService()
    var panorama = new window.google.maps.StreetViewPanorama(
      document.getElementById('map') as HTMLElement,
      {
        addressControl: false,
        linksControl: gameData.gameSettings.canMove,
        panControl: true,
        panControlOptions: {
          position: google.maps.ControlPosition.LEFT_BOTTOM,
        },
        enableCloseButton: false,
        zoomControl: false,
        fullscreenControl: false,
      },
    )
    panorama.setOptions({
      showRoadLabels: false,
      clickToGo: gameData.gameSettings.canMove,
      scrollwheel: gameData.gameSettings.canZoom,
    })

    const processSVData = (data: any, status: any) => {
      if (data == null) {
        alert('There was an error loading the round :(')
      } else {
        panorama.setPano(data.location.pano)
        panorama.setPov({
          heading: location.heading || 0,
          pitch: location.pitch || 0,
        })
        panorama.setZoom(location.zoom || 0)
        panorama.setVisible(true)
      }
    }

    sv.getPanorama(
      {
        location: location,
        radius: gameData.mapId === 'near-you' ? 50000 : 50,
      },
      processSVData,
    )

    setLoading(false)
  }

  return (
    <StyledStreetView>
      {loading && <LoadingPage />}

      <div id="map">
        <StreetViewControls />
        <GameStatus
          gameData={gameData}
          setView={setView}
          setGameData={setGameData}
          currGuess={currGuess}
        />
        <GuessMap
          coordinate={location}
          zoom={8}
          currGuess={currGuess}
          setCurrGuess={setCurrGuess}
          handleSubmitGuess={handleSubmitGuess}
        />
      </div>

      <GoogleMapReact
        bootstrapURLKeys={GoogleMapConfig}
        center={location}
        zoom={11}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      ></GoogleMapReact>
    </StyledStreetView>
  )
}

export default StreetView
