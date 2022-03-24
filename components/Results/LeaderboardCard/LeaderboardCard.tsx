import { CogIcon } from '@heroicons/react/outline'
import { FC, useState } from 'react'
import { StyledLeaderboardCard } from '.'
import { Game } from '../../../backend/models'
import { MapType } from '../../../types'
import { formatDistance, formatRoundTime, formatSettingsLabel } from '../../../utils/helperFunctions'
import { Banner } from '../../Layout'
import { Avatar, Icon } from '../../System'
import { Select } from '../../System/Select'

type Props = {
  gameData: Game;
  mapData: MapType;
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
                <span className="label2">{formatSettingsLabel(gameData.gameSettings)}</span>
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
          
              <>
              <div className="rowDivider"></div>
              <div className="userSection">
                {/*showPlace && <span className="userPlace">#{idx + 1}</span>*/}
                <div className="userInfo">
                  <Avatar url={`/images/avatars/${gameData.userAvatar}.jpg` || ''} alt='' size={30}/>
                  <span className="username">{gameData.userName}</span>
                </div>
              </div>
              <div className="userResultSection hideOnSmall">
                <div className="pointsWrapper">
                  <span>{gameData.guesses[0].points} pts</span>
                </div>
                <div className="distanceTimeWrapper">
                  <span className="distance">{formatDistance(gameData.guesses[0].distance)}</span>
                  <div className="divider"></div>
                  <span className="time">{formatRoundTime(gameData.guesses[0].time)}</span>
                </div>
              </div>
              <div className="userResultSection hideOnSmall">
                <div className="pointsWrapper">
                  <span>{gameData.guesses[1].points} pts</span>
                </div>
                <div className="distanceTimeWrapper">
                  <span className="distance">{formatDistance(gameData.guesses[1].distance)}</span>
                  <div className="divider"></div>
                  <span className="time">{formatRoundTime(gameData.guesses[1].time)}</span>
                </div>
              </div>
              <div className="userResultSection hideOnSmall">
                <div className="pointsWrapper">
                  <span>{gameData.guesses[2].points} pts</span>
                </div>
                <div className="distanceTimeWrapper">
                  <span className="distance">{formatDistance(gameData.guesses[2].distance)}</span>
                  <div className="divider"></div>
                  <span className="time">{formatRoundTime(gameData.guesses[2].time)}</span>
                </div>
              </div>
              <div className="userResultSection hideOnSmall">
                <div className="pointsWrapper">
                  <span>{gameData.guesses[3].points} pts</span>
                </div>
                <div className="distanceTimeWrapper">
                  <span className="distance">{formatDistance(gameData.guesses[3].distance)}</span>
                  <div className="divider"></div>
                  <span className="time">{formatRoundTime(gameData.guesses[3].time)}</span>
                </div>
              </div>
              <div className="userResultSection hideOnSmall">
                <div className="pointsWrapper">
                  <span>{gameData.guesses[4].points} pts</span>
                </div>
                <div className="distanceTimeWrapper">
                  <span className="distance">{formatDistance(gameData.guesses[4].distance)}</span>
                  <div className="divider"></div>
                  <span className="time">{formatRoundTime(gameData.guesses[4].time)}</span>
                </div>
              </div>
              <div className="userResultSection">
                <div className="pointsWrapper">
                  <span>{gameData.totalPoints} pts</span>
                </div>
                <div className="distanceTimeWrapper">
                  <span className="distance">{formatDistance(gameData.totalDistance)}</span>
                  <div className="divider"></div>
                  <span className="time">{formatRoundTime(gameData.totalTime)}</span>
                </div>
              </div>
              </>         
          </div>
        </div>      
      </Banner>    
    </StyledLeaderboardCard>
  )
}

export default LeaderboardCard
