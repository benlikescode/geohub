import { SparklesIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyledFinalResultsCard } from '.'
import { resetGame, selectGame, updateView } from '../../redux/game'
import { GameType } from '../../types'
import { Icon, Button, ProgressBar, FlexGroup } from '../System'

type Props = {
  totalPoints: number
}

const FinalResultsCard: FC<Props> = ({ totalPoints }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const game: GameType = useSelector(selectGame)
  const MAP_ID = game.map
  const calculateProgress = () => {
    const progress = (totalPoints / 25000) * 100

    if (progress < 1) {
      return 1
    }

    return progress
  }

  const handlePlayAgain = () => {
    router.push(`/map/${MAP_ID}`)
    dispatch(resetGame({
      id: game.id,
      map: game.map
    }))  
  }

  const handleDetailedResults = () => {
    router.push(`/results/1`)
  }

  return (
    <StyledFinalResultsCard>
      <div className="contentGrid">
      <div className="textWrapper">
        <span className="distanceMessage">Game Over, well done!</span>
        <div className="pointsWrapper">
          <span>{totalPoints} points total</span>
          <Icon size={24} fill="#8DB8FF">
            <SparklesIcon />
          </Icon>
        </div>
      </div>
      <ProgressBar progress={calculateProgress()}/>
      <FlexGroup gap={20}>
        <Button type="solidBlue" callback={handleDetailedResults} isRound>Detailed Results</Button>
        <Button type="solidBlue" callback={handlePlayAgain} isRound>Play Again</Button>
      </FlexGroup>    
    </div>
    </StyledFinalResultsCard>
  )
}

export default FinalResultsCard
