import { CogIcon } from '@heroicons/react/outline'
import { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import { StyledLeaderboardCard } from '.'
import { Game } from '../../../backend/models'
import { selectUser } from '../../../redux/user'
import { GameSettingsType, MapType } from '../../../types'
import { formatSettingsLabel } from '../../../utils/helperFunctions'
import { Banner } from '../../Layout'
import { Avatar, Icon } from '../../System'
import { Select } from '../../System/Select'

type Props = {
  gameData: Game
}

const LeaderboardCard: FC<Props> = ({ gameData }) => {
  //const showPlace = (leaderboard.length > 1)
  const showPlace = false
  const [selectState, setSelectState] = useState()
  const user = useSelector(selectUser)
  const selectOptions = ['Filter by', 'Top', 'Friends']

  // HARD CODED MAP FOR NOW
  const testLocation = {
    lat: 10,
    lng: 10
  }

  const testMap: MapType = {
    id: '',
    name: 'World',
    description: 'The classic game mode we all love, any country is fair game!',
    usersPlayed: 60123,
    likes: 9251,
    locations: [testLocation],
    previewImg: '/images/worldMap.jpg',
    creator: 'GeoHub'
  }

  return (
    <StyledLeaderboardCard>
      <Banner>
        <div className="leaderboardWrapper">
        <div className="topSection">
          <div className="gameInfoWrapper">
            <div className="gameInfoItem">
              <Avatar url={testMap.previewImg} alt='' size={50} />
              <div className="gameInfoContent">
                <span className="label1">{testMap.name}</span>
                <span className="label2">{testMap.creator}</span>
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

          
            <>
            <div className="rowDivider"></div>
            <div className="userSection">
              {/*showPlace && <span className="userPlace">#{idx + 1}</span>*/}
              <div className="userInfo">
                <Avatar url={user.avatar} alt='' size={30}/>
                <span className="username">{user.name}</span>
              </div>
            </div>
            <div className="userResultSection">
              <div className="pointsWrapper">
                <span>{gameData.guesses[0].points} pts</span>
              </div>
              <div className="distanceTimeWrapper">
                <span className="distance">{gameData.guesses[0].distance} km</span>
                <div className="divider"></div>
                <span className="time">{gameData.guesses[0].time} mins</span>
              </div>
            </div>
            <div className="userResultSection">
              <div className="pointsWrapper">
                <span>{gameData.guesses[1].points} pts</span>
              </div>
              <div className="distanceTimeWrapper">
                <span className="distance">{gameData.guesses[1].distance} km</span>
                <div className="divider"></div>
                <span className="time">{gameData.guesses[1].time} mins</span>
              </div>
            </div>
            <div className="userResultSection">
              <div className="pointsWrapper">
                <span>{gameData.guesses[2].points} pts</span>
              </div>
              <div className="distanceTimeWrapper">
                <span className="distance">{gameData.guesses[2].distance} km</span>
                <div className="divider"></div>
                <span className="time">{gameData.guesses[2].time} mins</span>
              </div>
            </div>
            <div className="userResultSection">
              <div className="pointsWrapper">
                <span>{gameData.guesses[3].points} pts</span>
              </div>
              <div className="distanceTimeWrapper">
                <span className="distance">{gameData.guesses[3].distance} km</span>
                <div className="divider"></div>
                <span className="time">{gameData.guesses[3].time} mins</span>
              </div>
            </div>
            <div className="userResultSection">
              <div className="pointsWrapper">
                <span>{gameData.guesses[4].points} pts</span>
              </div>
              <div className="distanceTimeWrapper">
                <span className="distance">{gameData.guesses[4].distance} km</span>
                <div className="divider"></div>
                <span className="time">{gameData.guesses[4].time} mins</span>
              </div>
            </div>
            <div className="userResultSection">
              <div className="pointsWrapper">
                <span>{gameData.totalPoints} pts</span>
              </div>
              <div className="distanceTimeWrapper">
                <span className="distance">{gameData.totalDistance} km</span>
                <div className="divider"></div>
                <span className="time">{5} mins</span>
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
