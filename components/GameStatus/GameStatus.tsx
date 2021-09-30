import { FC } from 'react'
import { useSelector } from 'react-redux'
import { StyledGameStatus } from '.'
import { selectGame } from '../../redux/game'

const GameStatus: FC = () => {
  const game = useSelector(selectGame)

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
    </StyledGameStatus>
  )
}

export default GameStatus
