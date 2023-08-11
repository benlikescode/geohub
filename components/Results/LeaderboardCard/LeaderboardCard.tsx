import { FC } from 'react'
import { Game } from '@backend/models'
import { Avatar } from '@components/system'
import { CogIcon } from '@heroicons/react/outline'
import { MapType } from '@types'
import { formatDistance, formatLargeNumber, formatRoundTime, formatSettingsLabel } from '@utils/helpers'
import { useAppSelector } from '../../../redux-utils'
import { StyledLeaderboardCard } from './'
import Link from 'next/link'

type Props = {
  gameData: Game[]
  mapData: MapType
  selectedGameIndex?: number
  setSelectedGameIndex?: (newIndex: number) => void
}

const LeaderboardCard: FC<Props> = ({ gameData, mapData, selectedGameIndex, setSelectedGameIndex }) => {
  const user = useAppSelector((state) => state.user)
  const showPlace = gameData.length > 1

  return (
    <StyledLeaderboardCard>
      <div className="leaderboardWrapper">
        <div className="gameInfoWrapper">
          <div className="gameInfoItem">
            <Link href={`/map/${gameData[0].mapId}`}>
              <a>
                <Avatar type="map" src={mapData.previewImg} size={50} />
              </a>
            </Link>
            <div className="gameInfoContent">
              <Link href={`/map/${gameData[0].mapId}`}>
                <a className="mapNameLabel">
                  {mapData.name}
                </a>
              </Link>
              <span className="label2">
                Created by {mapData.creator === 'GeoHub' ? 'GeoHub' : mapData.creatorDetails?.name}
              </span>
            </div>
          </div>

          <div className="gameInfoItem">
            <div className="settingsAvatar">
              <CogIcon />
            </div>

            <div className="gameInfoContent">
              <span className="label1">Game Settings</span>
              <span className="label2">{formatSettingsLabel(gameData[0].gameSettings)}</span>
            </div>
          </div>
        </div>

        <div className="leaderboardSection">
          <div className="leaderboardHeaderRow">
            <div className="titleSection">
              <span>LEADERBOARD</span>
            </div>
            <div className="titleSection hideOnSmall">
              <span>Round 1</span>
            </div>
            <div className="titleSection hideOnSmall">
              <span>Round 2</span>
            </div>
            <div className="titleSection hideOnSmall">
              <span>Round 3</span>
            </div>
            <div className="titleSection hideOnSmall">
              <span>Round 4</span>
            </div>
            <div className="titleSection hideOnSmall">
              <span>Round 5</span>
            </div>
            <div className="titleSection">
              <span>Total</span>
            </div>
          </div>

          {gameData.map((game, gameIdx) => (
            <div
              key={gameIdx}
              className={`leaderboardRow ${selectedGameIndex === gameIdx ? 'selected' : ''}`}
              onClick={() => setSelectedGameIndex && setSelectedGameIndex(gameIdx)}
            >
              <div className="userSection">
                {showPlace && <span className="userPlace">#{gameIdx + 1}</span>}
                <div className="userInfo">
                  <Avatar
                    type="user"
                    src={game.userDetails ? game.userDetails?.avatar?.emoji : game.userAvatar?.emoji}
                    backgroundColor={game.userDetails ? game.userDetails?.avatar?.color : game.userAvatar?.color}
                  />

                  <span className="username">{game.userDetails ? game.userDetails?.name : game.userName}</span>
                </div>
              </div>

              {game.guesses.map((guess, guessIdx) => (
                <div key={guessIdx} className="userResultSection hideOnSmall">
                  <div className="pointsWrapper">
                    <span>{formatLargeNumber(guess.points)} pts</span>
                  </div>
                  <div className="distanceTimeWrapper">
                    <span className="distance">
                      {guess.timedOut && !guess.timedOutWithGuess
                        ? 'Timed out'
                        : formatDistance(guess.distance, user.distanceUnit)}
                    </span>
                    <div className="divider">-</div>
                    <span className="time">{formatRoundTime(guess.time)}</span>
                  </div>
                </div>
              ))}

              <div className="userResultSection">
                <div className="pointsWrapper">
                  <span>{formatLargeNumber(game.totalPoints)} pts</span>
                </div>
                <div className="distanceTimeWrapper">
                  <span className="distance">{formatDistance(game.totalDistance, user.distanceUnit)}</span>
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
