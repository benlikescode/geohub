import { CogIcon } from '@heroicons/react/outline'
import { FC, useState } from 'react'
import { StyledLeaderboardCard } from '.'
import { GameSettingsType, MapType } from '../../../types'
import { formatSettingsLabel } from '../../../utils/helperFunctions'
import { Banner } from '../../Layout'
import { Avatar, Icon } from '../../System'
import { Select } from '../../System/Select'

type Props = {
  map: MapType
  gameSettings: GameSettingsType
  leaderboard: any[]
}

const LeaderboardCard: FC<Props> = ({ map, gameSettings, leaderboard }) => {
  const showPlace = (leaderboard.length > 1)
  const [selectState, setSelectState] = useState()

  const selectOptions = ['Filter by', 'Top', 'Friends']

  return (
    <StyledLeaderboardCard>
      <Banner>
        <div className="leaderboardWrapper">
        <div className="topSection">
          <div className="gameInfoWrapper">
            <div className="gameInfoItem">
              <Avatar url={map.previewImg} alt='' size={50} />
              <div className="gameInfoContent">
                <span className="label1">{map.name}</span>
                <span className="label2">{map.creator}</span>
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
                <span className="label2">{formatSettingsLabel(gameSettings)}</span>
              </div>
            </div>
          </div>

          <Select options={selectOptions} callback={setSelectState} />      
        </div>

        <div className="leaderboardSection">
          <div className="titleSection">
            <span>LEADERBOARD</span>
          </div>
          <div className="titleSection">
            <span>Round 1</span>
          </div>
          <div className="titleSection">
            <span>Round 2</span>
          </div>
          <div className="titleSection">
            <span>Round 3</span>
          </div>
          <div className="titleSection">
            <span>Round 4</span>
          </div>
          <div className="titleSection">
            <span>Round 5</span>
          </div>
          <div className="titleSection">
            <span>Total</span>
          </div>

          {leaderboard.map((row, idx) => (
            <>
            <div className="rowDivider"></div>
            <div className="userSection">
              {showPlace && <span className="userPlace">#{idx + 1}</span>}
              <div className="userInfo">
                <Avatar url={row.user.avatar} alt='' size={30}/>
                <span className="username">{row.user.name}</span>
              </div>
            </div>
            <div className="userResultSection">
              <div className="pointsWrapper">
                <span>{row.rounds[0].points} pts</span>
              </div>
              <div className="distanceTimeWrapper">
                <span className="distance">{row.rounds[0].distance} km</span>
                <div className="divider"></div>
                <span className="time">{row.rounds[0].time} mins</span>
              </div>
            </div>
            <div className="userResultSection">
              <div className="pointsWrapper">
                <span>{row.rounds[1].points} pts</span>
              </div>
              <div className="distanceTimeWrapper">
                <span className="distance">{row.rounds[1].distance} km</span>
                <div className="divider"></div>
                <span className="time">{row.rounds[1].time} mins</span>
              </div>
            </div>
            <div className="userResultSection">
              <div className="pointsWrapper">
                <span>{row.rounds[2].points} pts</span>
              </div>
              <div className="distanceTimeWrapper">
                <span className="distance">{row.rounds[2].distance} km</span>
                <div className="divider"></div>
                <span className="time">{row.rounds[2].time} mins</span>
              </div>
            </div>
            <div className="userResultSection">
              <div className="pointsWrapper">
                <span>{row.rounds[3].points} pts</span>
              </div>
              <div className="distanceTimeWrapper">
                <span className="distance">{row.rounds[3].distance} km</span>
                <div className="divider"></div>
                <span className="time">{row.rounds[3].time} mins</span>
              </div>
            </div>
            <div className="userResultSection">
              <div className="pointsWrapper">
                <span>{row.rounds[4].points} pts</span>
              </div>
              <div className="distanceTimeWrapper">
                <span className="distance">{row.rounds[4].distance} km</span>
                <div className="divider"></div>
                <span className="time">{row.rounds[4].time} mins</span>
              </div>
            </div>
            <div className="userResultSection">
              <div className="pointsWrapper">
                <span>{row.rounds[5].points} pts</span>
              </div>
              <div className="distanceTimeWrapper">
                <span className="distance">{row.rounds[5].distance} km</span>
                <div className="divider"></div>
                <span className="time">{row.rounds[5].time} mins</span>
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
