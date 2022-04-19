import Link from 'next/link'
import React, { FC } from 'react'
import { StyledFinalResultsCard } from '.'
import { Game } from '../../backend/models'
import { Button, ProgressBar, FlexGroup } from '../System'

type Props = {
  gameData: Game
}

const FinalResultsCard: FC<Props> = ({ gameData }) => {

  // converts total points to a percentage
  const calculateProgress = () => {
    const progress = (gameData.totalPoints / 25000) * 100

    if (progress < 1) {
      return 1
    }

    return progress
  }

  return (
    <StyledFinalResultsCard>
      <div className="finalResultsWrapper">
        <div className="contentGrid">
          <div className="textWrapper">
            <div className="finishedMsg">
              <span>The game is finished, well done!</span>
            </div>
            <div className="pointsWrapper">
              <span><strong className="totalPoints">{gameData.totalPoints}</strong> points total</span>
            </div>
          </div>

          <ProgressBar progress={calculateProgress()}/>

          <FlexGroup gap={20}>    
            <Link href={gameData.mapId ? `/results/${gameData.id}` : '/'}>
              <a>
                <Button type="ghostLight">{gameData.mapId ? 'Detailed Results' : 'Return To Home'}</Button>
              </a>
            </Link>
                           
            <Link href={gameData.mapId ? `/map/${gameData.mapId}` : '/aerial'}>
              <a>
                <Button type="solidPurple" width="180px">Play Again</Button>
              </a>
            </Link>
          </FlexGroup>    
        </div>
      </div>     
    </StyledFinalResultsCard>
  )
}

export default FinalResultsCard