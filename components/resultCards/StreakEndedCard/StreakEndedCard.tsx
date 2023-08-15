/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import Game from '@backend/models/game'
import { StreakCountryList } from '@components/StreakCountryList'
import { Button } from '@components/system'
import { useAppDispatch, useAppSelector } from '@redux/hook'
import { updateStartTime } from '@redux/slices'
import { GameViewType } from '@types'
import countries from '@utils/constants/countries'
import { KEY_CODES } from '@utils/constants/keyCodes'
import { mailman, showToast } from '@utils/helpers'
import { StyledStreakEndedCard } from './'

type Props = {
  gameData: Game
  setGameData: (gameData: Game) => void
  view: GameViewType
  setView: (view: GameViewType) => void
}

const StreakEndedCard: FC<Props> = ({ gameData, setGameData, view, setView }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [showSummary, setShowSummary] = useState(false)

  const user = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const guessedCountryCode = gameData.guesses[gameData.guesses.length - 1].streakLocationCode
  const correctCountryCode = gameData.rounds[gameData.round - 2].countryCode

  const guessedCountry = countries.find((x) => x.code === guessedCountryCode)?.name
  const correctCountry = countries.find((x) => x.code === correctCountryCode)?.name

  const IS_CHALLENGE = !!gameData.challengeId

  useEffect(() => {
    if (view !== 'Result') return

    document.addEventListener('keydown', handleKeyDown, { once: true })

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [view])

  const handleKeyDown = async (e: KeyboardEvent) => {
    const actionKeys = [KEY_CODES.SPACE, KEY_CODES.SPACE_IE11, KEY_CODES.ENTER]

    if (actionKeys.includes(e.key)) {
      IS_CHALLENGE ? navigateToResults() : playAgain()
    }
  }

  const playAgain = async () => {
    if (!user.id) {
      return router.push('/register')
    }

    const newGameData = {
      mapId: gameData.mapId,
      mapName: gameData.mapName,
      gameSettings: gameData.gameSettings,
      mode: gameData.mode,
    }

    // store start time
    dispatch(updateStartTime({ startTime: new Date().getTime() }))

    setIsLoading(true)

    const res = await mailman('games', 'POST', JSON.stringify(newGameData))

    setIsLoading(false)

    if (res.error) {
      return showToast('error', res.error.message)
    }

    setGameData(res)

    router.replace(`/game/${res._id}`, undefined, { shallow: true })
  }

  const navigateToResults = () => {
    const url = IS_CHALLENGE ? `/results/challenge/${gameData.challengeId}` : `/results/${gameData.id}`

    router.push(url)
  }

  const navigateToStreaksPage = () => {
    router.push('/streaks')
  }

  return (
    <StyledStreakEndedCard>
      {showSummary ? (
        <div className="result-wrapper">
          <p className="streak-summary-count">
            {`Your streak ended at ${gameData.streak} ${gameData.streak === 1 ? 'country' : 'countries'}`}.
          </p>

          <div className="country-list">
            <StreakCountryList gameData={gameData} />
          </div>

          <div className="buttons-wrapper">
            <Button className="play-again-btn" onClick={() => playAgain()} isLoading={isLoading} spinnerSize={24}>
              Play Again
            </Button>
            {IS_CHALLENGE ? (
              <Button className="view-summary-btn" onClick={() => navigateToResults()}>
                View Leaderboard
              </Button>
            ) : (
              <Button className="view-summary-btn" onClick={() => navigateToStreaksPage()}>
                Back To Streaks
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="result-wrapper">
          {guessedCountryCode ? (
            <div className="correct-country">
              You guessed <span>{guessedCountry}</span>
              <img
                src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${guessedCountryCode?.toUpperCase()}.svg`}
                alt={guessedCountry}
              />
              but the correct country was <span>{correctCountry}</span>
              <img
                src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${correctCountryCode?.toUpperCase()}.svg`}
                alt={correctCountry}
              />
            </div>
          ) : (
            <div className="correct-country">
              The correct country was <span>{correctCountry}</span>
              <img
                src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${correctCountryCode?.toUpperCase()}.svg`}
                alt={correctCountry}
              />
            </div>
          )}

          <p className="streak-count">
            {`Your streak ended at ${gameData.streak} ${gameData.streak === 1 ? 'country' : 'countries'}`}.
          </p>

          <div className="buttons-wrapper">
            <Button className="play-again-btn" onClick={() => playAgain()} isLoading={isLoading} spinnerSize={24}>
              Play Again
            </Button>
            <Button className="view-summary-btn" onClick={() => setShowSummary(true)}>
              View Summary
            </Button>

            {/* <div className="side-button">
                <button className="results-btn" onClick={() => setShowSummary(true)}>
                  <ChartPieIcon />
                </button>
                <span>Summary</span>
              </div>

              <div className="side-button">
                <Button className="play-again-btn" onClick={() => playAgain()} isLoading={isLoading} spinnerSize={24}>
                  Play Again
                </Button>

                <span>New Country Streak</span>
              </div>

              <div className="side-button">
                <button className="map-btn" onClick={() => navigateToStreaksPage()}>
                  <MapIcon />
                </button>
                <span>Exit</span>
              </div> */}
          </div>
        </div>
      )}
    </StyledStreakEndedCard>
  )
}

export default StreakEndedCard
