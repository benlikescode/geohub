import Link from 'next/link'
import router from 'next/router'
import { FC } from 'react'
import { Game } from '@backend/models'
import { Button, FlexGroup, ProgressBar } from '@components/system'
import { ChartPieIcon, MapIcon } from '@heroicons/react/outline'
import { useAppDispatch, useAppSelector } from '@redux/hook'
import { updateGameSettings, updateStartTime } from '@redux/slices'
import { GameSettingsType, UserType } from '@types'
import { formatLargeNumber, mailman, showErrorToast } from '@utils/helpers'
import { ResultsWrapper } from '../ResultsWrapper'
import { StyledStandardFinalResults } from './'

type Props = {
  gameData: Game
  setGameData: (gameData: any) => void
  setView: (view: any) => void
}

const StandardFinalResults: FC<Props> = ({ gameData, setGameData, setView }) => {
  const IS_CHALLENGE = !!gameData.challengeId
  const user: UserType = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()

  // Converts total points to a percentage
  const calculateProgress = () => {
    const progress = (gameData.totalPoints / 25000) * 100

    return progress
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

    const res = await mailman('games', 'POST', JSON.stringify(newGameData))

    if (res.error) {
      return showErrorToast(res.error.message)
    }

    router.replace(`/game/${res}`)
  }

  const navigateToResults = () => {
    const url = IS_CHALLENGE ? `/results/challenge/${gameData.challengeId}` : `/results/${gameData.id}`

    router.push(url)
  }

  const navigateToMapsPage = () => {
    const url = gameData.isDailyChallenge ? '/daily-challenge' : `/map/${gameData.mapId}`

    router.push(url)
  }

  return (
    <StyledStandardFinalResults>
      <div className="results-card">
        <div className="pointsWrapper">{`${formatLargeNumber(gameData.totalPoints)} Total Points`}</div>

        <div className="progress-bar">
          <ProgressBar progress={calculateProgress()} />
        </div>

        {/* <div className="finishedMessage">The game is finished, well done!</div> */}

        <div className="buttons-wrapper">
          <div className="side-button">
            <button className="results-btn" onClick={() => navigateToResults()}>
              <ChartPieIcon />
            </button>
            <span>Breakdown</span>
          </div>

          <div className="side-button">
            <button className="play-again-btn" onClick={() => playAgain()}>
              Play Again
            </button>
            <span>New Game, Same Map</span>
          </div>

          <div className="side-button">
            <button className="map-btn" onClick={() => navigateToMapsPage()}>
              <MapIcon />
            </button>
            <span>Exit</span>
          </div>
        </div>
      </div>

      {/* <FlexGroup gap={20}>
        <Link
          href={
            gameData.mapId
              ? IS_CHALLENGE
                ? `/results/challenge/${gameData.challengeId}`
                : `/results/${gameData.id}`
              : '/'
          }
        >
          <a className="secondary-button">{gameData.mapId ? 'Detailed Results' : 'Return To Home'}</a>
        </Link>

        {gameData.isDailyChallenge ? (
          <Link href={'/daily-challenge'}>
            <a>
              <Button>Finish Challenge</Button>
            </a>
          </Link>
        ) : (
          <Link href={`/map/${gameData.mapId}`}>
            <a>
              <Button>Play Again</Button>
            </a>
          </Link>
        )}
      </FlexGroup> */}
    </StyledStandardFinalResults>
  )
}

export default StandardFinalResults
