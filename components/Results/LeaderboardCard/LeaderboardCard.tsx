import { FC } from 'react'
import { Game } from '@backend/models'
import { Avatar } from '@components/System'
import { CogIcon } from '@heroicons/react/outline'
import { MapType } from '@types'
import { formatDistance, formatLargeNumber, formatRoundTime, formatSettingsLabel } from '@utils/helperFunctions'
import { StyledLeaderboardCard } from './'

type Props = {
  gameData: Game[]
  mapData: MapType
  selectedGameIndex?: number
  setSelectedGameIndex?: (newIndex: number) => void
}

const LeaderboardCard: FC<Props> = ({ gameData, mapData, selectedGameIndex, setSelectedGameIndex }) => {
  const showPlace = gameData.length > 1

  return (
    <StyledLeaderboardCard>
      <div className="leaderboard-wrapper">
        <div className="game-info-wrapper">
          <div className="game-info-item">
            <Avatar type="map" src={mapData.previewImg} size={50} />

            <div className="game-info-content">
              <span className="label1">{mapData.name}</span>
              <span className="label2">
                Created by {mapData.creator === 'GeoHub' ? 'GeoHub' : mapData.creatorDetails?.name}
              </span>
            </div>
          </div>

          <div className="game-info-item">
            <div className="settings-avatar">
              <CogIcon />
            </div>

            <div className="game-info-content">
              <span className="label1">Game Settings</span>
              <span className="label2">{formatSettingsLabel(gameData[0].gameSettings)}</span>
            </div>
          </div>
        </div>

        <div className="leaderboard-section">
          <div className="leaderboard-header-row">
            <div className="title-section">
              <span>LEADERBOARD</span>
            </div>
            <div className="title-section hide-on-small">
              <span>Round 1</span>
            </div>
            <div className="title-section hide-on-small">
              <span>Round 2</span>
            </div>
            <div className="title-section hide-on-small">
              <span>Round 3</span>
            </div>
            <div className="title-section hide-on-small">
              <span>Round 4</span>
            </div>
            <div className="title-section hide-on-small">
              <span>Round 5</span>
            </div>
            <div className="title-section">
              <span>Total</span>
            </div>
          </div>

          {gameData.map((game, gameIdx) => (
            <div
              key={gameIdx}
              className={`leaderboard-row ${selectedGameIndex === gameIdx ? 'selected' : ''}`}
              onClick={() => setSelectedGameIndex && setSelectedGameIndex(gameIdx)}
            >
              <div className="user-section">
                {showPlace && <span className="user-place">#{gameIdx + 1}</span>}
                <div className="user-info">
                  <Avatar
                    type="user"
                    src={game.userDetails ? game.userDetails?.avatar?.emoji : game.userAvatar?.emoji}
                    backgroundColor={game.userDetails ? game.userDetails?.avatar?.color : game.userAvatar?.color}
                  />

                  <span className="username">{game.userDetails ? game.userDetails?.name : game.userName}</span>
                </div>
              </div>

              {game.guesses.map((guess, guessIdx) => (
                <div key={guessIdx} className="user-result-section hide-on-small">
                  <div className="points-wrapper">
                    <span>{formatLargeNumber(guess.points)} pts</span>
                  </div>
                  <div className="distance-time-wrapper">
                    <span className="distance">
                      {guess.timedOut && !guess.timedOutWithGuess ? 'Timed out' : formatDistance(guess.distance)}
                    </span>
                    <div className="divider">-</div>
                    <span className="time">{formatRoundTime(guess.time)}</span>
                  </div>
                </div>
              ))}

              <div className="user-result-section">
                <div className="points-wrapper">
                  <span>{formatLargeNumber(game.totalPoints)} pts</span>
                </div>
                <div className="distance-time-wrapper">
                  <span className="distance">{formatDistance(game.totalDistance)}</span>
                  <div className="divider">-</div>
                  <span className="time">{formatRoundTime(game.totalTime)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StyledLeaderboardCard>
  )
}

export default LeaderboardCard
