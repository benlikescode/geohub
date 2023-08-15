import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import Game from '@backend/models/game'
import { StreakCountryList } from '@components/StreakCountryList'
import { Button } from '@components/system'
import { ChartPieIcon, MapIcon } from '@heroicons/react/outline'
import { useAppDispatch, useAppSelector } from '@redux/hook'
import { updateStartTime } from '@redux/slices'
import { GameViewType } from '@types'
import { KEY_CODES } from '@utils/constants/keyCodes'
import { mailman, showToast } from '@utils/helpers'
import { StyledStreakFinalResults } from './'

type Props = {
  gameData: Game
  setGameData: (gameData: any) => void
  view: GameViewType
  setView: (view: GameViewType) => void
}

const StreakFinalResults: FC<Props> = ({ gameData, setGameData, view, setView }) => {
  const [isLoading, setIsLoading] = useState(false)

  const user = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const IS_CHALLENGE = !!gameData.challengeId

  useEffect(() => {
    if (view !== 'FinalResults') return

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
    <StyledStreakFinalResults>
      <div className="results-card">
        <p className="streak-count">
          {`Your streak ended at ${gameData.streak} ${gameData.streak === 1 ? 'country' : 'countries'}`}.
        </p>

        <div className="country-list">
          <StreakCountryList gameData={gameData} />
        </div>

        {IS_CHALLENGE ? (
          <div className="buttons-wrapper">
            <div className="side-button">
              <Button className="play-again-btn" onClick={() => navigateToResults()}>
                Breakdown
              </Button>

              <span>View the leaderboard</span>
            </div>
          </div>
        ) : (
          <div className="buttons-wrapper">
            <div className="side-button">
              <button className="results-btn" onClick={() => navigateToResults()}>
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
            </div>
          </div>
        )}
      </div>
    </StyledStreakFinalResults>
  )
}

export default StreakFinalResults
