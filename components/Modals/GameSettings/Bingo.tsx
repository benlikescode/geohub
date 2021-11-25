import { ClockIcon, XIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { StyledGameSettings } from '.'
import { mailman } from '../../../backend/utils/mailman'
import { updateStartTime } from '../../../redux/game'
import { selectUser } from '../../../redux/user'
import { UserType } from '../../../types'
import { formatTimeLimit } from '../../../utils/helperFunctions'
import { Banner } from '../../Layout'
import { Button, FlexGroup, Icon, Slider, Checkbox, Avatar } from '../../System'

type Props = {
  closeModal: () => void;
}

const GameSettings: FC<Props> = ({ closeModal }) => {
  const [showDetailedChecked, setShowDetailedChecked] = useState(true)
  const [easyChecked, setEasyChecked] = useState(true)
  const [mediumChecked, setMediumChecked] = useState(false)
  const [hardChecked, setHardChecked] = useState(false)
  const [sliderVal, setSliderVal] = useState(61)
  const router = useRouter()
  const user: UserType = useSelector(selectUser)
  const dispatch = useDispatch()

  const showErrorToast = () => toast.error('A game could not be created, try again later.', {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: 0,
    theme: 'dark'
  })

  const handleStartGame = async () => {
    const startTime = new Date().getTime()
    dispatch(updateStartTime({ startTime }))

    const data = {
      userId: user.id,
      startTime: startTime,
      difficulty: 'Easy'
    }

    const { status, res } = await mailman('bingo', 'POST', JSON.stringify(data))

    if (status === 200) {
      router.push(`/bingo/${res}`)
    }
    else {
      showErrorToast()
    } 
  }
  

  return (
    <StyledGameSettings>
      <Banner>
        <div className="header">
          <h2>Start Game</h2>
          <Button type="icon" callback={() => closeModal()}>
            <Icon size={30} hoverColor="var(--color2)">
              <XIcon />
            </Icon>
          </Button> 
        </div>

        <div className="mainContent">     
          <FlexGroup gap={15}>
            <Avatar url={'/images/bingoAvatar.jpg'} size={60} alt="Bingo" outline/>
            <div className="mapInfo">
              <span className="mapName">Geo-Bingo</span>
              <span className="mapDescription">Given a bingo card of random things/people, your task is to search across the world to find these items and get a Geo-Bingo!</span>
            </div>
          </FlexGroup>

          <div className="settingsWrapper">
            <span>Difficulty</span>
            <FlexGroup gap={15}>
              <Checkbox setChecked={setEasyChecked} />
              <span>Easy</span>
            </FlexGroup>

            <FlexGroup gap={15}>
              <Checkbox setChecked={setMediumChecked} />
              <span>Medium</span>
            </FlexGroup>

            <FlexGroup gap={15}>
              <Checkbox setChecked={setHardChecked} />
              <span>Hard</span>
            </FlexGroup>
           
            <div className="timeLimitWrapper">
              <div className="timeLabel">
                <Icon size={24} fill="#888888">
                  <ClockIcon />
                </Icon>
                <span className="timeLimit">{formatTimeLimit(sliderVal)}</span>
              </div>
            
              <Slider onChange={setSliderVal} />
            </div>                                        
          </div>        
        </div>

        <div className="footer">
          <Button 
            type="ghost" 
            width="130px" 
            callback={() => closeModal()}
          >
            Cancel
          </Button>

          <Button 
            type="solidPurple" 
            width="175px" 
            callback={() => handleStartGame()}
          >
            Start Game
          </Button>        
        </div>
      </Banner>
    </StyledGameSettings>
  )
}

export default GameSettings
