import { FC } from 'react'
import { Game } from '@backend/models'
import { StreakCountryList } from '@components/StreakCountryList'
import { Avatar } from '@components/system'
import { formatRoundTime } from '@utils/helpers'
import { StyledStreaksLeaderboard } from './'

type Props = {
  gameData: Game[]
  selectedGameIndex?: number
  setSelectedGameIndex?: (newIndex: number) => void
}

const StreaksLeaderboard: FC<Props> = ({ gameData, selectedGameIndex, setSelectedGameIndex }) => {
  const showPlace = gameData.length > 1

  return (
    <StyledStreaksLeaderboard>
      <div className="leaderboard-wrapper">
        <div className="users-list">
          <div className="leaderboard-header">Players</div>
          {gameData.map((game, idx) => (
            <div
              key={idx}
              className={`user-item ${selectedGameIndex === idx || gameData.length === 1 ? 'selected' : ''}`}
              onClick={() => setSelectedGameIndex && setSelectedGameIndex(idx)}
            >
              <div className="user-details">
                {showPlace && <span className="userlace">#{idx + 1}</span>}
                <div className="user-info">
                  <Avatar
                    type="user"
                    src={game.userDetails ? game.userDetails?.avatar?.emoji : game.userAvatar?.emoji}
                    backgroundColor={game.userDetails ? game.userDetails?.avatar?.color : game.userAvatar?.color}
                  />

                  <span className="username">{game.userDetails ? game.userDetails?.name : game.userName}</span>
                </div>
              </div>

              <div className="game-details">
                <div className="streak-count">{game.streak} streak</div>
                <div className="time-count">{formatRoundTime(game.totalTime)}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="countries-list">
          <div className="leaderboard-header">Game breakdown</div>
          <StreakCountryList gameData={gameData[selectedGameIndex || 0]} />
        </div>
      </div>
    </StyledStreaksLeaderboard>
  )
}

export default StreaksLeaderboard
