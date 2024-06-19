import React, { FC, useEffect, useRef, useState } from 'react'
import { Game } from '@backend/models'
import { GameStatus } from '@components/GameStatus'
import { GuessMap } from '@components/GuessMap'
import { LoadingPage } from '@components/layout'
import { StreaksGuessMap } from '@components/StreaksGuessMap'
import { StreetViewControls } from '@components/StreetViewControls'
import { MapIcon } from '@heroicons/react/outline'
import { useAppSelector } from '@redux/hook'
import { GameViewType, GoogleMapsConfigType, LocationType } from '@types'
import { getStreetviewOptions } from '@utils/constants/googleMapOptions'
import { KEY_CODES } from '@utils/constants/keyCodes'
import { mailman, showToast } from '@utils/helpers'
import { StyledStreetView } from './'
import { DailyQuotaModal } from '@components/modals/DailyQuotaModal'

type Props = {
  gameData: Game
  setGameData: (gameData: Game) => void
  view: GameViewType
  setView: (view: GameViewType) => void
}

const Streetview: FC<Props> = ({ gameData, setGameData, view, setView }) => {
  const [loading, setLoading] = useState(true)
  const [currGuess, setCurrGuess] = useState<LocationType | null>(null)
  const [countryStreakGuess, setCountryStreakGuess] = useState('')
  const [mobileMapOpen, setMobileMapOpen] = useState(false)
  const [googleMapsConfig, setGoogleMapsConfig] = useState<GoogleMapsConfigType>()
  const [showQuotaModal, setShowQuotaModal] = useState(false)

  const location = gameData.rounds[gameData.round - 1]
  const game = useAppSelector((state) => state.game)
  const user = useAppSelector((state) => state.user)

  const serviceRef = useRef<google.maps.StreetViewService | null>(null)
  const panoramaRef = useRef<google.maps.StreetViewPanorama | null>(null)

  const undoLocRef = useRef<LocationType[]>([])

  // Initializes Streetview & loads first pano
  useEffect(() => {
    if (!googleMapsConfig) return

    initializeStreetView()

    const timeoutId = setTimeout(checkForQuotaExceeded, 300)

    return () => clearTimeout(timeoutId)
  }, [googleMapsConfig])

  // Loads all subsequent panos
  useEffect(() => {
    if (view !== 'Game' || !serviceRef.current) return

    loadNewPano()
  }, [view])

  const checkForQuotaExceeded = () => {
    if (user.quotaModalDismissed || user.mapsAPIKey) {
      return
    }

    const QUOTA_EXCEEDED_MSG = 'For development purposes only'

    const googleMapRootDivs = document.getElementsByClassName('gm-style')

    if (!googleMapRootDivs?.length) {
      return
    }

    Array.from(googleMapRootDivs).map((mapRootDiv) => {
      const innerDivs = mapRootDiv.querySelectorAll('div')

      Array.from(innerDivs).map((innerDiv) => {
        if (innerDiv.innerText.includes(QUOTA_EXCEEDED_MSG)) {
          return setShowQuotaModal(true)
        }
      })
    })
  }

  const initializeStreetView = () => {
    const svService = new google.maps.StreetViewService()

    const svPanorama = new google.maps.StreetViewPanorama(
      document.getElementById('streetview') as HTMLElement,
      getStreetviewOptions(gameData)
    )

    svPanorama.addListener("position_changed", trackLocations)

    serviceRef.current = svService
    panoramaRef.current = svPanorama

    loadNewPano()
  }

  const loadNewPano = async () => {
    setLoading(true)

    const svService = serviceRef.current
    const svPanorama = panoramaRef.current

    if (!svService || !svPanorama) return

    await svService.getPanorama({ location, radius: 50 }, (data) => {
      if (!data || !data.location) {
        return showToast('error', 'Could not load streetview for this location')
      }

      svPanorama.setPano(data.location.pano)
      svPanorama.setPov({
        heading: location.heading || 0,
        pitch: location.pitch || 0,
      })
      svPanorama.setZoom(location.zoom || 0)
      svPanorama.setVisible(true)

      undoLocRef.current = []
    })

    setLoading(false)
  }

  const trackLocations = () => {
    if (!panoramaRef.current) return

    let pos = panoramaRef.current.getPosition()

    if (pos == null) return
    const undo = undoLocRef.current
    const loc: LocationType = {'lat': pos.lat(), 'lng': pos.lng()}
    const compareLocs = (loc1?: LocationType, loc2?: LocationType): boolean => {
      if (!loc1 || !loc2 ) return false

      return loc1.lat === loc2.lat && loc1.lng === loc2.lng;
    }

    // don't store repeated movements (e.g. return to start)
    if (undo.length < 1 || !compareLocs(loc, undo.at(-1))) undo.push(loc)
  }

  const handleSubmitGuess = async (timedOut?: boolean) => {
    if (currGuess || countryStreakGuess || timedOut) {
      if (!game.startTime) {
        return showToast('error', 'Something went wrong')
      }

      const body = {
        guess: currGuess || { lat: 0, lng: 0 },
        guessTime: (new Date().getTime() - game.startTime) / 1000,
        localRound: gameData.round,
        timedOut,
        timedOutWithGuess: currGuess !== null,
        streakLocationCode: countryStreakGuess.toLowerCase(),
      }

      const res = await mailman(`games/${gameData._id}`, 'PUT', JSON.stringify(body))

      if (res.error) {
        return showToast('error', res.error.message)
      }

      setGameData({ ...res.game, mapDetails: res.mapDetails, userDetails: gameData.userDetails })
      setView('Result')
    }
  }

  const handleBackToStart = () => {
    if (!panoramaRef.current) return

    panoramaRef.current.setPosition(location)
    panoramaRef.current.setPov({ heading: location.heading || 0, pitch: location.pitch || 0 })
  }

  const handleBackToStartKeys = (e: KeyboardEvent) => {
    const backToStartKeys = ['r']

    if (backToStartKeys.includes(e.key)) {
      handleBackToStart()
    }
  }

  useEffect(() => {
    if (view !== 'Game') return

    document.addEventListener('keydown', handleBackToStartKeys)

    return () => {
      document.removeEventListener('keydown', handleBackToStartKeys)
    }
  }, [view])

  const handleUndoLastMove = () => {
    if (!panoramaRef.current) return

    if (undoLocRef.current.length > 1) {
      undoLocRef.current.pop() // drop current location
      panoramaRef.current.setPosition(undoLocRef.current[undoLocRef.current.length-1]); // set to last location
    }
  }

  const handleUndoLastMoveKeys = (e: KeyboardEvent) => {
    const undoMoveKeys = ['z']

    if (undoMoveKeys.includes(e.key) && gameData.gameSettings.canMove) {
      handleUndoLastMove()
    }
  }

  useEffect(() => {
    if (view !== 'Game') return

    document.addEventListener('keydown', handleUndoLastMoveKeys)

    return () => {
      document.removeEventListener('keydown', handleUndoLastMoveKeys)
    }
  }, [])

  const handleSubmitGuessKeys = async (e: KeyboardEvent) => {
    const submitGuessKeys = [KEY_CODES.SPACE, KEY_CODES.SPACE_IE11, KEY_CODES.ENTER]

    if (submitGuessKeys.includes(e.key)) {
      await handleSubmitGuess()
    }
  }

  useEffect(() => {
    if (view !== 'Game') return

    document.addEventListener('keydown', handleSubmitGuessKeys, { once: true })

    return () => {
      document.removeEventListener('keydown', handleSubmitGuessKeys)
    }
  }, [currGuess, countryStreakGuess, view])

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
    if (view !== 'Game') return

    document.addEventListener('keydown', handleMovingArrowKeys, { capture: true })

    return () => {
      document.removeEventListener('keydown', handleMovingArrowKeys, { capture: true })
    }
  }, [view])

  return (
    <>
      <StyledStreetView showMap={!loading}>
        {loading && <LoadingPage />}

        <div id="streetview">
          <StreetViewControls handleBackToStart={handleBackToStart} handleUndoLastMove={gameData.gameSettings.canMove ? handleUndoLastMove : undefined} />
          {view === 'Game' && <GameStatus gameData={gameData} handleSubmitGuess={handleSubmitGuess} />}

          {gameData.mode === 'standard' && (
            <GuessMap
              currGuess={currGuess}
              setCurrGuess={setCurrGuess}
              handleSubmitGuess={handleSubmitGuess}
              mobileMapOpen={mobileMapOpen}
              closeMobileMap={() => setMobileMapOpen(false)}
              googleMapsConfig={googleMapsConfig}
              setGoogleMapsConfig={setGoogleMapsConfig}
              resetMap={view === 'Game'}
              gameData={gameData}
            />
          )}

          {gameData.mode === 'streak' && (
            <StreaksGuessMap
              countryStreakGuess={countryStreakGuess}
              setCountryStreakGuess={setCountryStreakGuess}
              handleSubmitGuess={handleSubmitGuess}
              mobileMapOpen={mobileMapOpen}
              closeMobileMap={() => setMobileMapOpen(false)}
              googleMapsConfig={googleMapsConfig}
              setGoogleMapsConfig={setGoogleMapsConfig}
              resetMap={view === 'Game'}
            />
          )}

          <button className="toggle-map-button" onClick={() => setMobileMapOpen(true)}>
            <MapIcon />
          </button>
        </div>
      </StyledStreetView>

      <DailyQuotaModal isOpen={showQuotaModal} closeModal={() => setShowQuotaModal(false)} />
    </>
  )
}

export default Streetview
