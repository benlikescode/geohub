import { ArrowsExpandIcon, ClockIcon, MapIcon, SwitchHorizontalIcon, UserGroupIcon, UserIcon, ZoomInIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { StyledGameSettings } from '.'
import { updateGameSettings } from '../../redux/game'
import { GameSettingsType, MapType } from '../../types'
import { formatTimeLimit } from '../../utils/helperFunctions'
import { Button, FlexGroup, Icon, Slider } from '../System'
import { Checkbox } from '../System/Checkbox'

const GameSettings: FC = () => {
  const [showDetailedChecked, setShowDetailedChecked] = useState(true)
  const [movingChecked, setMovingChecked] = useState(true)
  const [panningChecked, setPanningChecked] = useState(true)
  const [zoomingChecked, setZoomingChecked] = useState(true)
  const [sliderVal, setSliderVal] = useState(61)
  const router = useRouter()
  const dispatch = useDispatch()

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

  const handleStartGame = () => {
    const gameSettings: GameSettingsType = {
      timeLimit: sliderVal,
      canMove: movingChecked,
      canPan: panningChecked, 
      canZoom: zoomingChecked
    }

    dispatch(updateGameSettings({
      gameSettings: gameSettings
    }))
    
    router.push(`/game/1`)
  }

  return (
    <StyledGameSettings>
      <div className="header">
        <h2>Start Game</h2>
      </div>

      <div className="mainContent">
        <div className="contentItem">
          <span className="label">Map</span>
          <div className="mapPreview">
            <div className="mapPreviewText">
              <span className="mapName">{testMap.name}</span>
              <span className="mapDescription">{testMap.description}</span>
            </div>
            <div className="mapImageWrapper">
              <div className="mapImage">
                <img src={testMap.previewImg} alt='' />
                <button className="changeMap">
                  <Icon size={24} fill="#fff">
                    <MapIcon />
                  </Icon>
                </button>
              </div>
            </div>        
          </div>
        </div>

        <div className="contentItem">
          <span className="label">Game Type</span>
          <div className="buttonsWrapper">
            <Button type="ghost">
              <Icon size={24}>
                <UserIcon />           
              </Icon>
              <span>Single Player</span>
            </Button>
            <Button type="ghost">
              <Icon size={24}>
                <UserGroupIcon />
              </Icon>
              <span>Challenge</span>
            </Button>
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
                  <Icon size={24}>
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
                    <Icon size={24}>
                      <ArrowsExpandIcon />
                    </Icon>
                    <span>Moving</span>
                  </FlexGroup>        
                </div>
                <div className="movementOption">
                  <Checkbox setChecked={setPanningChecked} />
                  <FlexGroup>
                    <Icon size={24}>
                      <SwitchHorizontalIcon />
                    </Icon>
                    <span>Panning</span>
                  </FlexGroup>        
                </div>
                <div className="movementOption">
                  <Checkbox setChecked={setZoomingChecked} />
                  <FlexGroup>
                    <Icon size={24}>
                      <ZoomInIcon />
                    </Icon>
                    <span>Zooming</span>
                  </FlexGroup>        
                </div>
              </div>
            </div>
          }      
        </div>
      </div>

      <div className="footer">
        <Button type="solidBlue" callback={() => handleStartGame()}>Start game</Button>
      </div>
    </StyledGameSettings>
  )
}

export default GameSettings
