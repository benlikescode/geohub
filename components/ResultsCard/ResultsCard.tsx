import { SparklesIcon } from '@heroicons/react/outline'
import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { StyledResultsCard } from '.'
import { updateStartTime } from '../../redux/game'
import { formatDistance } from '../../utils/helperFunctions'
import { Banner } from '../Layout'
import { Button, Icon, ProgressBar } from '../System'

type Props = {
  round: number;
  distance: number;
  points: number;
  setView: (view: 'Game' | 'Result' | 'FinalResults') => void
}

const ResultsCard: FC<Props> = ({ round, distance, points, setView }) => {
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
      setView('FinalResults')
    }
    else {
      // store start time
      dispatch(updateStartTime({ startTime: new Date().getTime() }))
      setView('Game')
    } 
  }

  return (
    <StyledResultsCard>
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
                 <span className="test">{`${points} points`}</span>
              </span>
            </div>
          </div>

          <ProgressBar progress={calculateProgress()}/>

          <Button type="solidPurple" callback={handleNextRound} width="200px">
            {round > 5 ? 'View Results' : 'Play Next Round'}
          </Button>
        </div> 
      </div>      
    </StyledResultsCard>
  )
}

export default ResultsCard