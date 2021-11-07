import { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyledGameStatus } from '.'
import { Game } from '../../backend/models'
import { formatTimeLimit } from '../../utils/helperFunctions'
import useInterval from '../../utils/hooks/useInterval'

type Props = {
  gameData: Game
  setView: (view: 'Game' | 'Result' | 'FinalResults') => void
}

const GameStatus: FC<Props> = ({ gameData, setView }) => {
  const startTime = gameData.gameSettings.timeLimit * 10
  const [timeLeft, setTimeLeft] = useState(startTime)
  const hasTimeLimit = gameData.gameSettings.timeLimit !== 61
/*
  if (hasTimeLimit) {
    useInterval(() => {
      setTimeLeft(timeLeft - 1)
    }, timeLeft !== 0 ? 1000 : null)
  }


  

  useEffect(() => {
    if (timeLeft === 0) {
      setView('Result')
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
