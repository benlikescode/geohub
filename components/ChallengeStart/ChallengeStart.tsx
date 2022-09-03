import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { Avatar, Icon } from '@components/System'
import {
  ArrowsExpandIcon,
  ClockIcon,
  SwitchHorizontalIcon,
  ZoomInIcon
} from '@heroicons/react/outline'
import { selectUser } from '@redux/user'
import { ChallengeType } from '@types'
import { formatTimeLimit } from '@utils/helperFunctions'

import { StyledChallengeStart } from './'

type Props = {
  challengeData: ChallengeType
  handleStartChallenge: (challengeData: ChallengeType) => void
  setView: (view: 'Start' | 'Game' | 'Result' | 'FinalResults') => void
}

const ChallengeStart: FC<Props> = ({ challengeData, handleStartChallenge, setView }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const user = useSelector(selectUser)
  const router = useRouter()

  const CAN_MOVE = challengeData.gameSettings.canMove
  const CAN_PAN = challengeData.gameSettings.canMove
  const CAN_ZOOM = challengeData.gameSettings.canZoom
  const HAS_TIME_LIMIT = challengeData.gameSettings.timeLimit !== 61
  const TIME_LIMIT = challengeData.gameSettings.timeLimit

  useEffect(() => {
    if (!user.id) {
      setIsLoggedIn(false)
      //console.log(challengeData)
    }
  }, [])

  const handleButtonClick = async () => {
    if (isLoggedIn) {
      handleStartChallenge(challengeData)
      setView('Game')
    } else {
      router.push('/register')
    }
  }

  return (
    <StyledChallengeStart>
      <div className="challengeStartWrapper">
        <h1 className="challengeTitle">You have been challenged!</h1>
        <div className="challengeCreator">
          <Avatar url={`/images/avatars/${challengeData.creatorAvatar}.jpg`} size={40} alt="Challenge Creator Avatar" />
          <span>{`${challengeData.creatorName} has challenged you to play GeoHub`}</span>
        </div>

        <button className="challengeBtn" onClick={() => handleButtonClick()}>
          {isLoggedIn ? 'Play Game' : 'Create Account'}
        </button>
      </div>

      <div className="challengeSettings">
        <div className="settingsItem">
          <Icon size={30} fill={HAS_TIME_LIMIT ? 'var(--green-400)' : '#888'}>
            <ClockIcon />
          </Icon>
          {HAS_TIME_LIMIT ? `${formatTimeLimit(TIME_LIMIT)} per round` : 'No Time Limit'}
        </div>

        <div className="settingsItem">
          <Icon size={30} fill={CAN_MOVE ? 'var(--green-400)' : '#888'}>
            <ArrowsExpandIcon />
          </Icon>
          {CAN_MOVE ? 'Moving Allowed' : 'No Move'}
        </div>

        <div className="settingsItem">
          <Icon size={30} fill={CAN_MOVE ? 'var(--green-400)' : '#888'}>
            <SwitchHorizontalIcon />
          </Icon>
          {CAN_PAN ? 'Panning Allowed' : 'No Pan'}
        </div>

        <div className="settingsItem">
          <Icon size={30} fill={CAN_MOVE ? 'var(--green-400)' : '#888'}>
            <ZoomInIcon />
          </Icon>
          {CAN_ZOOM ? 'Zooming Allowed' : 'No Zoom'}
        </div>
      </div>
    </StyledChallengeStart>
  )
}

export default ChallengeStart
