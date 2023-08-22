/* eslint-disable @next/next/no-img-element */
import { FC, useEffect } from 'react'
import Game from '@backend/models/game'
import { useAppDispatch } from '@redux/hook'
import { updateStartTime } from '@redux/slices'
import { GameViewType } from '@types'
import countries from '@utils/constants/countries'
import { KEY_CODES } from '@utils/constants/keyCodes'
import { StyledStreakContinueCard } from './'

type Props = {
  gameData: Game
  view: GameViewType
  setView: (view: GameViewType) => void
}

const StreakContinueCard: FC<Props> = ({ gameData, view, setView }) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (view !== 'Result') return

    document.addEventListener('keydown', handleKeyDown, { once: true })

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [view])

  const handleKeyDown = (e: KeyboardEvent) => {
    const actionKeys = [KEY_CODES.SPACE, KEY_CODES.SPACE_IE11, KEY_CODES.ENTER]

    if (actionKeys.includes(e.key)) {
      handleNextRound()
    }
  }

  const handleNextRound = () => {
    dispatch(updateStartTime({ startTime: new Date().getTime() }))
    setView('Game')
  }

  const getCorrectCountryCode = () => {
    if (gameData.round < 2) return ''

    const correctCountryCode = gameData.rounds[gameData.round - 2].countryCode

    return correctCountryCode?.toUpperCase()
  }

  const getCorrectCountryName = () => {
    if (gameData.round < 2) return ''

    const correctCountryCode = gameData.rounds[gameData.round - 2].countryCode
    const correctCountry = countries.find((x) => x.code === correctCountryCode)?.name

    return correctCountry
  }

  return (
    <StyledStreakContinueCard>
      <div className="result-wrapper">
        <div className="correct-country">
          <span>{`The country was indeed ${getCorrectCountryName()}`}</span>
          <img
            src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${getCorrectCountryCode()}.svg`}
            alt={getCorrectCountryCode()}
          />
        </div>
        <p className="streak-count">
          {`Your streak is now at ${gameData.streak} ${gameData.streak === 1 ? 'country' : 'countries'}`}.
        </p>
      </div>

      <div className="actionButton">
        <button className="next-round-btn" onClick={() => handleNextRound()}>
          Next Round
        </button>
      </div>
    </StyledStreakContinueCard>
  )
}

export default StreakContinueCard
