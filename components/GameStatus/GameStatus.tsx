import { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyledGameStatus } from '.'
import { Game } from '../../backend/models'
import { selectGameNew } from '../../redux/gameNew'
import { formatTimeLimit } from '../../utils/helperFunctions'
import useInterval from '../../utils/hooks/useInterval'

type Props = {
  gameData: Game
}

const GameStatus: FC<Props> = ({ gameData }) => {
  const gameNew = useSelector(selectGameNew)
  const startTime = gameNew.gameSettings.timeLimit * 10
  const [timeLeft, setTimeLeft] = useState(startTime)
  const hasTimeLimit = gameNew.gameSettings.timeLimit !== 61
  const dispatch = useDispatch()
/*
  if (hasTimeLimit) {
    useInterval(() => {
      setTimeLeft(timeLeft - 1)
    }, timeLeft !== 0 ? 1000 : null)
  }
*/

  
/*
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
  
*/


  return (
    <StyledGameStatus>
      <div className="infoSection">
        <div className="label">
          <span>Map</span>
        </div>
        <div className="value">
          <span>World</span>
        </div>
      </div>

      <div className="infoSection">
        <div className="label">
          <span>Round</span>
        </div>
        <div className="value">
          <span>{gameData.round} / 5</span>
        </div>
      </div>

      <div className="infoSection">
        <div className="label">
          <span>Points</span>
        </div>
        <div className="value">
          <span>{gameData.totalPoints}</span>
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
