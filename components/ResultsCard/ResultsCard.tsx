import { SparklesIcon } from '@heroicons/react/outline'
import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyledResultsCard } from '.'
import { nextRound, selectGame } from '../../redux/game'
import { ResultType } from '../../types'
import { Button, Icon } from '../System'
import { ProgressBar } from '../System/ProgressBar'

type Props = {
  result: ResultType
}

const ResultsCard: FC<Props> = ({ result }) => {

  const calculateProgress = () => {
    return (result.points / 5000) * 100
  }

  const dispatch = useDispatch()
  const game = useSelector(selectGame)

  const handleNextRound = () => {
    dispatch(nextRound({
      round: game.round + 1,
      currView: 'Game'
    }))
  }

  return (
    <StyledResultsCard>
      <div className="contentGrid">
        <div className="textWrapper">
          <span className="distanceMessage">
            Your guess was <span className="emphasisText">{result.distanceAway} km</span> from the correct location
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
        <Button type="solidPink" callback={handleNextRound}>Next Round</Button>
      </div>
    </StyledResultsCard>
  )
}

export default ResultsCard
