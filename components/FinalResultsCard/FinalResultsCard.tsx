import Link from 'next/link'
import React, { FC } from 'react'
import { Game } from '@backend/models'
import { Button, FlexGroup, ProgressBar } from '@components/System'
import { formatLargeNumber } from '@utils/helperFunctions'
import { StyledFinalResultsCard } from './'

type Props = {
  gameData: Game
}

const FinalResultsCard: FC<Props> = ({ gameData }) => {
  const IS_CHALLENGE = !!gameData.challengeId

  // Converts total points to a percentage
  const calculateProgress = () => {
    const progress = (gameData.totalPoints / 25000) * 100

    return progress
  }

  return (
    <StyledFinalResultsCard>
      <div className="finalResultsWrapper">
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
            <a>
              <Button variant="ghostLight">{gameData.mapId ? 'Detailed Results' : 'Return To Home'}</Button>
            </a>
          </Link>

          <Link href={gameData.mapId ? `/map/${gameData.mapId}` : '/aerial'}>
            <a>
              <Button>Play Again</Button>
            </a>
          </Link>
        </FlexGroup>
      </div>
    </StyledFinalResultsCard>
  )
}

export default FinalResultsCard
