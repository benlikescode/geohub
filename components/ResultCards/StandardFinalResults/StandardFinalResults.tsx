import Link from 'next/link'
import { FC } from 'react'
import { Game } from '@backend/models'
import { Button, FlexGroup, ProgressBar } from '@components/System'
import { formatLargeNumber } from '@utils/helpers'
import { ResultsWrapper } from '../ResultsWrapper'
import { StyledStandardFinalResults } from './'

type Props = {
  gameData: Game
}

const StandardFinalResults: FC<Props> = ({ gameData }) => {
  const IS_CHALLENGE = !!gameData.challengeId

  // Converts total points to a percentage
  const calculateProgress = () => {
    const progress = (gameData.totalPoints / 25000) * 100

    return progress
  }

  return (
    <ResultsWrapper>
      <StyledStandardFinalResults>
        <div className="pointsWrapper">{`${formatLargeNumber(gameData.totalPoints)} total points`}</div>

        <div className="progress-bar">
          <ProgressBar progress={calculateProgress()} />
        </div>

        <div className="finishedMessage">The game is finished, well done!</div>

        <FlexGroup gap={20}>
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
        </FlexGroup>
      </StyledStandardFinalResults>
    </ResultsWrapper>
  )
}

export default StandardFinalResults
