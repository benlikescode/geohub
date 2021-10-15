import { SparklesIcon } from '@heroicons/react/outline'
import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyledResultsCard } from '.'
import { nextRound, selectGame } from '../../redux/game'
import { ResultType } from '../../types'
import { Button, Icon, ProgressBar } from '../System'

type Props = {
  result: ResultType
}

const ResultsCard: FC<Props> = ({ result }) => {
  const game = useSelector(selectGame)
  const dispatch = useDispatch()

  const calculateProgress = () => {
    const progress = (result.points / 5000) * 100

    if (progress < 1) {
      return 1
    }

    return progress
  }
  
  const handleNextRound = () => {
    if (game.round === 5) {
      dispatch(nextRound({
        currView: 'FinalResults',
        totalPoints: game.totalPoints + result.points
      }))
    }
    else {
      dispatch(nextRound({
        round: game.round + 1,
        currView: 'Game',
        totalPoints: game.totalPoints + result.points
      }))
    } 
  }

  return (
    <StyledResultsCard>
      <div className="contentGrid">
        <div className="textWrapper">
          <span className="distanceMessage">
            Your guess was <span className="emphasisText">{result.formattedDistance}</span> from the correct location
          </span>
          <div className="pointsWrapper">
            <span>
              You earned <span className="emphasisText">{result.points} points</span>
            </span>
            <Icon size={24} fill="#8DB8FF">
              <SparklesIcon />
            </Icon>
          </div>
        </div>
        <ProgressBar progress={calculateProgress()}/>
        <Button type="solidBlue" callback={handleNextRound} isRound>
          {game.round === 5 ? 'View Results' : 'Next Round'}
        </Button>
      </div>
    </StyledResultsCard>
  )
}

export default ResultsCard
