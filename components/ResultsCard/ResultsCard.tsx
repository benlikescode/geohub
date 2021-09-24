import { SparklesIcon } from '@heroicons/react/outline'
import { FC } from 'react'
import { StyledResultsCard } from '.'
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
        <Button type="solidPink">Next Round</Button>
      </div>
    </StyledResultsCard>
  )
}

export default ResultsCard
