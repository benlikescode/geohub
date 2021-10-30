import { SparklesIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { StyledFinalResultsCard } from '.'
import { Game } from '../../backend/models'
import { Banner } from '../Layout'
import { Icon, Button, ProgressBar, FlexGroup } from '../System'

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
      <Banner>
        <div className="finalResultsWrapper">
          <div className="contentGrid">
            <div className="textWrapper">
              <span className="distanceMessage">Game Over, well done!</span>
              <div className="pointsWrapper">
                <span>{gameData.totalPoints} points total</span>
                <Icon size={24} fill="#8DB8FF">
                  <SparklesIcon />
                </Icon>
              </div>
            </div>

            <ProgressBar progress={calculateProgress()}/>

            <FlexGroup gap={20}>            
              <Link href={`/results/${gameData.id}`}>
                <a>
                  <Button type="ghostLight">Detailed Results</Button>
                </a>
              </Link>
              
              <Link href={`/map/${gameData.mapId}`}>
                <a>
                  <Button type="solidPurple" width="180px">Play Again</Button>
                </a>
              </Link>
            </FlexGroup>    
          </div>
        </div>     
      </Banner> 
    </StyledFinalResultsCard>
  )
}

export default FinalResultsCard
