import { SparklesIcon } from '@heroicons/react/outline'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyledResultsCard } from '.'
import { selectGame, updateCurrView } from '../../redux/game'
import { formatDistance } from '../../utils/helperFunctions'
import { Banner } from '../Layout'
import { Button, Icon, ProgressBar } from '../System'

type Props = {
  round: number;
  distance: number;
  points: number;
}

const ResultsCard: FC<Props> = ({ round, distance, points }) => {
  const game = useSelector(selectGame)
  const dispatch = useDispatch()
  
  const calculateProgress = () => {
    const progress = (points / 5000) * 100

    if (progress < 1) {
      return 1
    }

    return progress
  }
  
  const handleNextRound = () => {
    if (round > 5) {
      dispatch(updateCurrView({ currView: 'FinalResults' }))
    }
    else {
      dispatch(updateCurrView({ currView: 'Game' }))
    } 
  }

  return (
    <StyledResultsCard>
      <Banner>
        <div className="resultsWrapper">
          <div className="contentGrid">
            <div className="textWrapper">
              <span className="distanceMessage">
                Your guess was 
                <span className="emphasisText"> {formatDistance(distance)} </span> 
                from the correct location
              </span>
              <div className="pointsWrapper">
                <span>
                  You earned 
                  <span className="emphasisText">{` ${points} points`}</span>
                </span>
                <Icon size={24} fill="#8DB8FF">
                  <SparklesIcon />
                </Icon>
              </div>
            </div>
            <ProgressBar progress={calculateProgress()}/>
            <Button type="solidPurple" callback={handleNextRound} width="180px">
              {round > 5 ? 'View Results' : 'Next Round'}
            </Button>
          </div> 
        </div>      
      </Banner>    
    </StyledResultsCard>
  )
}

export default ResultsCard
