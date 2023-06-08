import { FC, useState } from 'react'
import { Button, ProgressBar } from '@components/System'
import { useAppDispatch, useAppSelector } from '@redux/hook'
import { updateStartTime } from '@redux/slices'
import { formatLargeNumber } from '@utils/helpers'
import formatDistance from '@utils/helpers/formatDistance'
import { DistanceType } from '../../../@types'
import { ResultsWrapper } from '../ResultsWrapper'
import { StyledStandardResults } from './'

type Props = {
  round: number
  distance: DistanceType
  points: number
  noGuess?: boolean
  setView: (view: 'Game' | 'Result' | 'FinalResults') => void
}

const StandardResults: FC<Props> = ({ round, distance, points, noGuess, setView }) => {
  const [progressFinished, setProgressFinished] = useState(false)
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user)

  const calculateProgress = () => {
    const progress = (points / 5000) * 100

    return progress
  }

  const handleNextRound = () => {
    if (round > 5) {
      setView('FinalResults')
    } else {
      // Store start time
      dispatch(updateStartTime({ startTime: new Date().getTime() }))
      setView('Game')
    }
  }

  return (
    <ResultsWrapper>
      <StyledStandardResults showPoints={progressFinished}>
        <div className="pointsWrapper">{`${formatLargeNumber(points)} points`}</div>

        <div className="progress-bar">
          <ProgressBar progress={calculateProgress()} setProgressFinished={setProgressFinished} />
        </div>

        <div>
          {noGuess ? (
            <span className="noGuessMessage">You did not make a guess this round 😢</span>
          ) : (
            <span className="distanceMessage">
              Your guess was
              <span className="emphasisText"> {formatDistance(distance, user.distanceUnit)} </span>
              from the correct location
            </span>
          )}
        </div>

        <div className="actionButton">
          <Button onClick={handleNextRound} width="200px">
            {round > 5 ? 'View Results' : 'Play Next Round'}
          </Button>
        </div>
      </StyledStandardResults>
    </ResultsWrapper>
  )
}

export default StandardResults
