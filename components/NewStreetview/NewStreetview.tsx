import React, { FC, useEffect, useRef, useState } from 'react'
import { Game } from '@backend/models'
import { GameStatus } from '@components/GameStatus'
import { LoadingPage } from '@components/layout'
import { NewGuessMap } from '@components/NewGuessMap'
import { StreetViewControls } from '@components/StreetViewControls'
import { useAppSelector } from '@redux/hook'
import { LocationType } from '@types'
import { getStreetviewOptions } from '@utils/constants/googleMapOptions'
import { KEY_CODES } from '@utils/constants/keyCodes'
import { mailman, showErrorToast } from '@utils/helpers'
import { StyledNewStreetview } from './'

type Props = {
  google: typeof window.google
  googleMap: google.maps.Map
  gameData: Game
  setGameData: (gameData: Game) => void
  setView: (view: 'Game' | 'Result' | 'FinalResults') => void
}

const NewStreetview: FC<Props> = ({ google, googleMap, gameData, setGameData, setView }) => {
  const [loading, setLoading] = useState(true)
  const [currGuess, setCurrGuess] = useState<LocationType | null>(null)
  const [countryStreakGuess, setCountryStreakGuess] = useState('')
  const [mobileMapOpen, setMobileMapOpen] = useState(false)

  const location = gameData.rounds[gameData.round - 1]
  const game = useAppSelector((state) => state.game)
  const user = useAppSelector((state) => state.user)

  const panoramaRef = useRef<google.maps.StreetViewPanorama | null>(null)

  useEffect(() => {
    const svService = new window.google.maps.StreetViewService()

    const svPanorama = new google.maps.StreetViewPanorama(
      document.getElementById('streetview') as HTMLElement,
      getStreetviewOptions(google, gameData)
    )

    svService.getPanorama({ location, radius: 50 }, (data) => {
      if (!data || !data.location) {
        return showErrorToast('Could not load streetview for this location')
      }

      svPanorama.setPano(data.location.pano)
      svPanorama.setPov({
        heading: location.heading || 0,
        pitch: location.pitch || 0,
      })
      svPanorama.setZoom(location.zoom || 0)
      svPanorama.setVisible(true)
    })

    panoramaRef.current = svPanorama

    setLoading(false)
  }, [])

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

    panoramaRef.current.setPosition(location)
    panoramaRef.current.setPov({ heading: location.heading || 0, pitch: location.pitch || 0 })
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

  return (
    <StyledNewStreetview showMap={!loading}>
      <div id="streetview">
        <StreetViewControls handleBackToStart={handleBackToStart} />
        <GameStatus gameData={gameData} handleSubmitGuess={handleSubmitGuess} />
        <NewGuessMap
          currGuess={currGuess}
          setCurrGuess={setCurrGuess}
          handleSubmitGuess={handleSubmitGuess}
          mobileMapOpen={mobileMapOpen}
          closeMobileMap={() => setMobileMapOpen(false)}
          googleMap={googleMap}
        />
      </div>
    </StyledNewStreetview>
  )
}

export default NewStreetview
