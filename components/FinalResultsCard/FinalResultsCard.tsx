import { SparklesIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyledFinalResultsCard } from '.'
import { selectGame } from '../../redux/game'
import { Banner } from '../Layout'
import { Icon, Button, ProgressBar, FlexGroup } from '../System'

const FinalResultsCard: FC = () => {
  const game = useSelector(selectGame)
  
  // converts total points to a percentage
  const calculateProgress = () => {
    const progress = (game.gameData.totalPoints / 25000) * 100

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
                <span>{game.gameData.totalPoints} points total</span>
                <Icon size={24} fill="#8DB8FF">
                  <SparklesIcon />
                </Icon>
              </div>
            </div>

            <ProgressBar progress={calculateProgress()}/>

            <FlexGroup gap={20}>            
              <Link href={`/results/${game.gameData.id}`}>
                <a>
                  <Button type="ghostLight">Detailed Results</Button>
                </a>
              </Link>
              
              <Link href={`/map/${game.gameData.mapId}`}>
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
