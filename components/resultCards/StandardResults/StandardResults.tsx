import { FC, useEffect, useState } from 'react'
import { ProgressBar } from '@components/system'
import { useAppDispatch, useAppSelector } from '@redux/hook'
import { updateStartTime } from '@redux/slices'
import { KEY_CODES } from '@utils/constants/keyCodes'
import { formatLargeNumber } from '@utils/helpers'
import formatDistance from '@utils/helpers/formatDistance'
import { DistanceType, GameViewType } from '../../../@types'
import { StyledStandardResults } from './'

type Props = {
  round: number
  distance: DistanceType
  points: number
  noGuess?: boolean
  view: GameViewType
  setView: (view: GameViewType) => void
}

const StandardResults: FC<Props> = ({ round, distance, points, noGuess, view, setView }) => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user)

  useEffect(() => {
    if (view !== 'Result') return

    document.addEventListener('keydown', handleKeyDown, { once: true })

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [view])

  const handleKeyDown = (e: KeyboardEvent) => {
    const actionKeys = [KEY_CODES.SPACE, KEY_CODES.SPACE_IE11, KEY_CODES.ENTER]

    if (actionKeys.includes(e.key)) {
      handleNextRound()
    }
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

  const calculateProgress = () => {
    const progress = (points / 5000) * 100

    return progress
  }

  return (
    <StyledStandardResults>
      <div className="pointsWrapper">{`${formatLargeNumber(points)} Points`}</div>

      <div className="progress-bar">
        <ProgressBar progress={calculateProgress()} />
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
        <button className="next-round-btn" onClick={() => handleNextRound()}>
          {round > 5 ? 'View Results' : 'Next Round'}
        </button>
      </div>
    </StyledStandardResults>
  )
}

export default StandardResults
