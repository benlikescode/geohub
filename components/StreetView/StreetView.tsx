import { FC, useEffect, useRef, useState } from 'react'
import { Game } from '@backend/models'
import { GameStatus } from '@components/GameStatus'
import { LoadingPage } from '@components/layout'
import { StreetViewControls } from '@components/StreetViewControls'
import { MapIcon } from '@heroicons/react/outline'
import { useAppSelector } from '@redux/hook'
import { LocationType } from '@types'
import { KEY_CODES } from '@utils/constants/keyCodes'
import { mailman, showErrorToast } from '@utils/helpers'
import { StyledStreetView } from './'

type Props = {
  gameData: Game
  setView: (view: 'Game' | 'Result' | 'FinalResults') => void
  setGameData: any
}

const StreetView: FC<Props> = ({ gameData, setView, setGameData }) => {
  const [loading, setLoading] = useState(true)
  const [currGuess, setCurrGuess] = useState<LocationType | null>(null)
  const [countryStreakGuess, setCountryStreakGuess] = useState('')
  const [adjustedLocation, setAdjustedLocation] = useState<LocationType | null>(null)
  const [mobileMapOpen, setMobileMapOpen] = useState(false)

  const location = gameData.rounds[gameData.round - 1]
  const game = useAppSelector((state) => state.game)
  const user = useAppSelector((state) => state.user)
  const panoramaRef = useRef<google.maps.StreetViewPanorama | null>(null)

  const handleSubmitGuess = async (timedOut?: boolean) => {
    if (currGuess || countryStreakGuess || timedOut) {
      if (!game.startTime) {
        return showErrorToast('Something went wrong')
      }

      const body = {
        guess: currGuess || { lat: 0, lng: 0 },
        guessTime: (new Date().getTime() - game.startTime) / 1000,
        localRound: gameData.round,
        userLocation: user.location,
        timedOut,
        timedOutWithGuess: currGuess !== null,
        adjustedLocation,
        streakLocationCode: countryStreakGuess.toLowerCase(),
      }

      const res = await mailman(`games/${gameData.id}`, 'PUT', JSON.stringify(body))

      if (res.error) {
        return showErrorToast(res.error.message, { id: 'streetView-submit' })
      }

      setGameData({ id: res._id, ...res })
      setView('Result')
    }
  }

  const handleBackToStart = () => {
    if (!panoramaRef.current) return

    panoramaRef.current.setPosition(adjustedLocation)

    // Have to check heading and pitch exist since Location type has them as possibly undefined...
    if (typeof adjustedLocation?.heading !== 'undefined' && typeof adjustedLocation.pitch !== 'undefined') {
      panoramaRef.current.setPov({ heading: adjustedLocation?.heading, pitch: adjustedLocation?.pitch })
    }
  }

  const handleSubmitGuessKeys = async (e: KeyboardEvent) => {
    const submitGuessKeys = [KEY_CODES.SPACE, KEY_CODES.SPACE_IE11, KEY_CODES.ENTER]

    if (submitGuessKeys.includes(e.key)) {
      await handleSubmitGuess()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleSubmitGuessKeys)

    return () => {
      document.removeEventListener('keydown', handleSubmitGuessKeys)
    }
  }, [currGuess, countryStreakGuess])

  const handleMovingArrowKeys = (e: KeyboardEvent) => {
    const movingArrowKeys = [
      KEY_CODES.ARROW_DOWN,
      KEY_CODES.ARROW_DOWN_IE11,
      KEY_CODES.ARROW_UP,
      KEY_CODES.ARROW_UP_IE11,
      'w',
      's',
    ]

    if (!gameData.gameSettings.canMove && movingArrowKeys.includes(e.key)) {
      e.stopPropagation()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleMovingArrowKeys, { capture: true })

    return () => {
      document.removeEventListener('keydown', handleMovingArrowKeys, { capture: true })
    }
  }, [])

  // const loadLocation = () => {
  //   var sv = new window.google.maps.StreetViewService()
  //   var panorama = new window.google.maps.StreetViewPanorama(document.getElementById('map') as HTMLElement, {
  //     addressControl: false, // hide address
  //     linksControl: gameData.gameSettings.canMove, // arrows to move
  //     panControl: true, // compass
  //     panControlOptions: {
  //       position: google.maps.ControlPosition.LEFT_BOTTOM,
  //     },
  //     motionTracking: false, // mobile tracking
  //     motionTrackingControl: false,
  //     enableCloseButton: false, // hide default UI elements
  //     zoomControl: false,
  //     fullscreenControl: false,
  //     showRoadLabels: false, // hide road labels
  //     clickToGo: gameData.gameSettings.canMove,
  //     scrollwheel: gameData.gameSettings.canZoom,
  //   })

  //   const processSVData = (data: any, status: any) => {
  //     if (data == null) {
  //       console.log('There was an error loading the round :(')
  //     } else {
  //       const adjustedLat = data.location.latLng.lat()
  //       const adjustedLng = data.location.latLng.lng()
  //       const adjustedLocation = { ...location, lat: adjustedLat, lng: adjustedLng }

  //       setAdjustedLocation(adjustedLocation)

  //       panorama.setPano(data.location.pano)
  //       panorama.setPov({
  //         heading: location.heading || 0,
  //         pitch: location.pitch || 0,
  //       })
  //       panorama.setZoom(location.zoom || 0)
  //       panorama.setVisible(true)
  //     }
  //   }

  //   sv.getPanorama(getPanoSettings(location, gameData.mapId.toString()), processSVData)

  //   panoramaRef.current = panorama

  //   setLoading(false)
  // }

  // const getPanoSettings = (location: LocationType, mapId: string) => {
  //   // Need a larger radius for Urban World
  //   if (mapId === URBAN_WORLD_ID) {
  //     return {
  //       location,
  //       radius: 1000,
  //       source: google.maps.StreetViewSource.OUTDOOR,
  //     }
  //   }

  //   return {
  //     location,
  //     radius: 50,
  //   }
  // }

  return (
    <StyledStreetView showMap={!loading}>
      {loading && <LoadingPage />}

      <div id="map">
        <StreetViewControls handleBackToStart={handleBackToStart} />
        <GameStatus gameData={gameData} handleSubmitGuess={handleSubmitGuess} />
        {/* {gameData.mode === 'standard' && (
          <GuessMap
            currGuess={currGuess}
            setCurrGuess={setCurrGuess}
            handleSubmitGuess={handleSubmitGuess}
            mobileMapOpen={mobileMapOpen}
            closeMobileMap={() => setMobileMapOpen(false)}
          />
        )}

        {gameData.mode === 'streak' && (
          <StreaksGuessMap
            countryStreakGuess={countryStreakGuess}
            setCountryStreakGuess={setCountryStreakGuess}
            handleSubmitGuess={handleSubmitGuess}
            mobileMapOpen={mobileMapOpen}
            closeMobileMap={() => setMobileMapOpen(false)}
          />
        )} */}

        <button className="toggle-map-button" onClick={() => setMobileMapOpen(true)}>
          <MapIcon />
        </button>
      </div>
    </StyledStreetView>
  )
}

export default StreetView
