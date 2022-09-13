import { FC, useState } from 'react'

import { Game } from '@backend/models'
import { Banner } from '@components/Layout'
import { Avatar, Icon } from '@components/System'
import { CogIcon } from '@heroicons/react/outline'
import { MapType } from '@types'
import {
  formatDistance,
  formatRoundTime,
  formatSettingsLabel
} from '@utils/helperFunctions'

import { StyledLeaderboardCard } from './'

type Props = {
  gameData: Game[]
  mapData: MapType
}

const LeaderboardCard: FC<Props> = ({ gameData, mapData }) => {
  //const showPlace = (leaderboard.length > 1) UPDATE WHEN CHALLENGES IMPLEMENTED
  const showPlace = false
  const [selectState, setSelectState] = useState()
  const selectOptions = ['Filter by', 'Top', 'Friends']

  return (
    <StyledLeaderboardCard>
      <Banner>
        <div className="leaderboardWrapper">
          <div className="gameInfoWrapper">
            <div className="gameInfoItem">
              <div className="mapAvatar">
                <img src={mapData.previewImg} alt="Map Avatar" />
              </div>

              <div className="gameInfoContent">
                <span className="label1">{mapData.name}</span>
                <span className="label2">Created by {mapData.creator}</span>
              </div>
            </div>

            <div className="gameInfoItem">
              <div className="settingsAvatar">
                <Icon size={30} fill="var(--color2)">
                  <CogIcon />
                </Icon>
              </div>

              <div className="gameInfoContent">
                <span className="label1">Game Settings</span>
                <span className="label2">{formatSettingsLabel(gameData[0].gameSettings)}</span>
              </div>
            </div>
          </div>

          <div className="leaderboardSection">
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

            {gameData.map((game) => (
              <>
                <div className="rowDivider"></div>
                <div className="userSection">
                  {/*showPlace && <span className="userPlace">#{idx + 1}</span>*/}
                  <div className="userInfo">
                    <Avatar
                      type="user"
                      src={game.userDetails ? game.userDetails[0]!.avatar.emoji : game.userAvatar?.emoji}
                      backgroundColor={game.userDetails ? game.userDetails[0]!.avatar.color : game.userAvatar?.color}
                    />

                    <span className="username">{game.userDetails ? game.userDetails[0]!.name : game.userName}</span>
                  </div>
                </div>
                <div className="userResultSection hideOnSmall">
                  <div className="pointsWrapper">
                    <span>{game.guesses[0].points} pts</span>
                  </div>
                  <div className="distanceTimeWrapper">
                    <span className="distance">{formatDistance(game.guesses[0].distance)}</span>
                    <div className="divider"></div>
                    <span className="time">{formatRoundTime(game.guesses[0].time)}</span>
                  </div>
                </div>
                <div className="userResultSection hideOnSmall">
                  <div className="pointsWrapper">
                    <span>{game.guesses[1].points} pts</span>
                  </div>
                  <div className="distanceTimeWrapper">
                    <span className="distance">{formatDistance(game.guesses[1].distance)}</span>
                    <div className="divider"></div>
                    <span className="time">{formatRoundTime(game.guesses[1].time)}</span>
                  </div>
                </div>
                <div className="userResultSection hideOnSmall">
                  <div className="pointsWrapper">
                    <span>{game.guesses[2].points} pts</span>
                  </div>
                  <div className="distanceTimeWrapper">
                    <span className="distance">{formatDistance(game.guesses[2].distance)}</span>
                    <div className="divider"></div>
                    <span className="time">{formatRoundTime(game.guesses[2].time)}</span>
                  </div>
                </div>
                <div className="userResultSection hideOnSmall">
                  <div className="pointsWrapper">
                    <span>{game.guesses[3].points} pts</span>
                  </div>
                  <div className="distanceTimeWrapper">
                    <span className="distance">{formatDistance(game.guesses[3].distance)}</span>
                    <div className="divider"></div>
                    <span className="time">{formatRoundTime(game.guesses[3].time)}</span>
                  </div>
                </div>
                <div className="userResultSection hideOnSmall">
                  <div className="pointsWrapper">
                    <span>{game.guesses[4].points} pts</span>
                  </div>
                  <div className="distanceTimeWrapper">
                    <span className="distance">{formatDistance(game.guesses[4].distance)}</span>
                    <div className="divider"></div>
                    <span className="time">{formatRoundTime(game.guesses[4].time)}</span>
                  </div>
                </div>
                <div className="userResultSection">
                  <div className="pointsWrapper">
                    <span>{game.totalPoints} pts</span>
                  </div>
                  <div className="distanceTimeWrapper">
                    <span className="distance">{formatDistance(game.totalDistance)}</span>
                    <div className="divider"></div>
                    <span className="time">{formatRoundTime(game.totalTime)}</span>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </Banner>
    </StyledLeaderboardCard>
  )
}

export default LeaderboardCard
