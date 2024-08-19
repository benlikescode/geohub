import { GameViewType, LocationType } from '@types'
import { KEY_CODES } from '@utils/constants/keyCodes'
import { mailman, showToast } from '@utils/helpers'
import { useEffect, useState } from 'react'
import { Game } from '@backend/models'
import { useAppSelector } from '@redux/hook'

type Props = {
  gameData: Game
  view: GameViewType
  setGameData: (gameData: Game) => void
  setView: (view: GameViewType) => void
}

export const useStreetView = ({ gameData, view, setGameData, setView }: Props) => {
  const [currGuess, setCurrGuess] = useState<LocationType | null>(null)
  const [countryStreakGuess, setCountryStreakGuess] = useState('')

  const game = useAppSelector((state) => state.game)

  // HANDLE MOVING KEYS
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

  // HANDLE SUBMITTING GUESS
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

  return { currGuess, countryStreakGuess, setCurrGuess, setCountryStreakGuess, handleSubmitGuess }
}
