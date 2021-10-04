import { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyledGameStatus } from '.'
import { addGuess, selectGame, updateRoundTimes, updateView } from '../../redux/game'
import { formatTimeLimit } from '../../utils/helperFunctions'
import useInterval from '../../utils/hooks/useInterval'

const GameStatus: FC = () => {
  const game = useSelector(selectGame)
  const startTime = game.gameSettings.timeLimit * 10
  const [timeLeft, setTimeLeft] = useState(startTime)
  const hasTimeLimit = game.gameSettings.timeLimit !== 61
  const dispatch = useDispatch()


  useInterval(() => {
    setTimeLeft(timeLeft - 1)
  }, timeLeft !== 0 ? 1000 : null)

  useEffect(() => {
    if (timeLeft === 0) {
      dispatch(updateView({
        currView: 'Result'
      }))
      dispatch(addGuess({
        guessedLocations: game.currGuess
      }))
    }  
  }, [timeLeft])

  useEffect(() => {
    return () => {
      console.log("TIMELEFT: " + timeLeft)
      
    }
  }, [])
  



  return (
    <StyledGameStatus>
      <div className="infoSection">
        <div className="label">
          <span>Map</span>
        </div>
        <div className="value">
          <span>{game.map}</span>
        </div>
      </div>

      <div className="infoSection">
        <div className="label">
          <span>Round</span>
        </div>
        <div className="value">
          <span>{game.round} / 5</span>
        </div>
      </div>

      <div className="infoSection">
        <div className="label">
          <span>Points</span>
        </div>
        <div className="value">
          <span>{game.totalPoints}</span>
        </div>
      </div>

      {hasTimeLimit &&
        <div className="infoSection">
          <div className="label">
            <span>Time</span>
          </div>
          <div className="value">
            <span>{timeLeft}</span>
          </div>
        </div>
      }

     
    </StyledGameStatus>
  )
}

export default GameStatus
