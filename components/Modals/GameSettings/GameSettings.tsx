import { ArrowsExpandIcon, ClockIcon, SwitchHorizontalIcon, UserGroupIcon, UserIcon, XIcon, ZoomInIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyledGameSettings } from '.'
import { mailman } from '../../../backend/utils/mailman'
import { updateStartTime } from '../../../redux/game'
import { selectUser, updateLocation } from '../../../redux/user'
import { GameSettingsType, LocationType, MapType, UserType } from '../../../types'
import { formatTimeLimit } from '../../../utils/helperFunctions'
import { Banner } from '../../Layout'
import { Button, FlexGroup, Icon, Slider, Checkbox, Avatar } from '../../System'
import { Challenge } from './Challenge'
import { toast } from 'react-toastify'

type Props = {
  closeModal: () => void;
  mapDetails: MapType;
}

const GameSettings: FC<Props> = ({ closeModal, mapDetails }) => {
  const [showDetailedChecked, setShowDetailedChecked] = useState(true)
  const [movingChecked, setMovingChecked] = useState(true)
  const [panningChecked, setPanningChecked] = useState(true)
  const [zoomingChecked, setZoomingChecked] = useState(true)
  const [gameType, setGameType] = useState<"Single Player" | "Challenge">("Single Player")
  const [showChallengeView, setShowChallengeView] = useState(false)
  const [sliderVal, setSliderVal] = useState(61)
  const router = useRouter()
  const user: UserType = useSelector(selectUser)
  const dispatch = useDispatch()
  const mapId = router.asPath.split('/')[2]

  const notify = () => toast.error('This map does not seem to have any locations', {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: 0,
    theme: 'dark'
  })

  useEffect(() => {
    if (mapId === 'near-you') {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function showLocation(position) {
          const latitude = position.coords.latitude
          const longitude = position.coords.longitude
      
          const location: LocationType = {
            lat: latitude, 
            lng: longitude
          }
  
          dispatch(updateLocation({ location }))
        })
      }   
    }  
  }, [])

  const handleClickBtn = () => {
    if (gameType === 'Single Player') {
      handleStartGame()
    }
    else {
      if (showChallengeView) {
        handleStartGame()
      }
      else {
        setShowChallengeView(true)
      }
    }
  }

  const handleStartGame = async () => {
    if (!user.id) {
      return router.push('/register')
    }

    const gameSettings: GameSettingsType = {
      timeLimit: sliderVal,
      canMove: movingChecked,
      canPan: panningChecked, 
      canZoom: zoomingChecked
    }

    const gameData = {
      mapId, 
      gameSettings,
      userId: user.id,
      userLocation: user.location
    }

    // store start time
    dispatch(updateStartTime({ startTime: new Date().getTime() }))

    const { status, res } = await mailman('games', 'POST', JSON.stringify(gameData))
    
    if (status === 400) {
      notify()   
    }
    else {
      router.push(`/game/${res}`)
    }
  }
  

  return (
    <StyledGameSettings>
      <Banner>
        <div className="header">
          <h2>{showChallengeView ? 'Start Challenge' : 'Start Game'}</h2>
          <Button type="icon" callback={() => closeModal()}>
            <Icon size={30} hoverColor="var(--color2)">
              <XIcon />
            </Icon>
          </Button>  
        </div>

        <div className="mainContent">
          {showChallengeView ?
            <Challenge /> :
            <>
              <FlexGroup gap={15}>
                <Avatar url={mapDetails.previewImg} size={60} alt=""/>
                <div className="mapInfo">
                  <span className="mapName">{mapDetails.name}</span>
                  <span className="mapDescription">{mapDetails.description}</span>
                </div>
              </FlexGroup>

              <div className="toggleBar">
                <div className={`toggleItem ${gameType === 'Single Player' ? 'active' : ''}`} onClick={() => setGameType('Single Player')}>
                  <FlexGroup gap={12}>
                    <div className="toggleIcon">
                      <UserIcon />
                    </div>          
                    <span className="toggleText">Single Player</span>
                  </FlexGroup>
                </div>

                <div className={`toggleItem ${gameType === 'Challenge' ? 'active' : ''}`} onClick={() => setGameType('Challenge')}>
                  <FlexGroup gap={12}>
                    <div className="toggleIcon">
                      <UserGroupIcon />  
                    </div>
                    <span className="toggleText">Challenge</span>
                  </FlexGroup>
                </div>
              </div>
      
              <div className="settingsWrapper">
                <div className="checkboxWrapper">
                  <Checkbox setChecked={setShowDetailedChecked} />
                  <span>Default Settings (No time limit, moving, panning, zooming allowed)</span>
                </div>

                {!showDetailedChecked &&
                  <div className="detailedSettings">
                    <div className="timeLimitWrapper">
                      <div className="timeLabel">
                        <Icon size={24} fill="#888888">
                          <ClockIcon />
                        </Icon>
                        <span className="timeLimit">{formatTimeLimit(sliderVal)}</span>
                      </div>
                    
                      <Slider onChange={setSliderVal} />
                    </div>

                    <div className="movementOptions">
                      <div className="movementOption">
                        <Checkbox setChecked={setMovingChecked} />
                        <FlexGroup>
                          <Icon size={24} fill="#888888">
                            <ArrowsExpandIcon />
                          </Icon>
                          <span>Moving</span>
                        </FlexGroup>        
                      </div>
                      <div className="movementOption">
                        <Checkbox setChecked={setPanningChecked} />
                        <FlexGroup>
                          <Icon size={24} fill="#888888">
                            <SwitchHorizontalIcon />
                          </Icon>
                          <span>Panning</span>
                        </FlexGroup>        
                      </div>
                      <div className="movementOption">
                        <Checkbox setChecked={setZoomingChecked} />
                        <FlexGroup>
                          <Icon size={24} fill="#888888">
                            <ZoomInIcon />
                          </Icon>
                          <span>Zooming</span>
                        </FlexGroup>        
                      </div>
                    </div>
                  </div>
                }                   
              </div>
            </>
          } 
        </div>

        <div className="footer">
          <Button 
            type="ghost" 
            callback={() => closeModal()}
            height="35px"
          >
            Cancel
          </Button>

          <Button 
            type="solidPurple" 
            callback={() => handleClickBtn()}
            height="35px"
          >
            {gameType === 'Single Player' ? 'Start Game' : 
            showChallengeView ? 'Start Game' : 'Invite Friends'}
          </Button>        
        </div>
      </Banner>
     
    </StyledGameSettings>
  )
}

export default GameSettings
