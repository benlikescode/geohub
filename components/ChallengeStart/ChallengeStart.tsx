import Image from 'next/image'
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import { Avatar, Icon } from '@components/System'
import {
  ArrowsExpandIcon,
  ClockIcon,
  LocationMarkerIcon,
  SwitchHorizontalIcon,
  ZoomInIcon,
} from '@heroicons/react/outline'
import { useAppSelector } from '@redux/hook'
import { ChallengeType } from '@types'
import { formatTimeLimit, redirectToRegister } from '@utils/helperFunctions'
import { StyledChallengeStart } from './'

type Props = {
  challengeData: ChallengeType
  handleStartChallenge: (challengeData: ChallengeType) => void
  setView: (view: 'Start' | 'Game' | 'Result' | 'FinalResults') => void
}

const ChallengeStart: FC<Props> = ({ challengeData, handleStartChallenge, setView }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const user = useAppSelector((state) => state.user)
  const router = useRouter()

  const CAN_MOVE = challengeData.gameSettings.canMove
  const CAN_PAN = challengeData.gameSettings.canPan
  const CAN_ZOOM = challengeData.gameSettings.canZoom
  const HAS_TIME_LIMIT = challengeData.gameSettings.timeLimit !== 0
  const TIME_LIMIT = challengeData.gameSettings.timeLimit
  console.log('HERRO', challengeData)
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
      redirectToRegister(router)
    }
  }

  return (
    <StyledChallengeStart>
      <div className="challengeStartWrapper">
        <Image
          src={`/images/mapAvatars/${challengeData?.mapDetails?.previewImg}`}
          alt=""
          layout="fill"
          objectFit="cover"
          style={{ opacity: 0.12 }}
        />

        <div className="map-name">
          <LocationMarkerIcon />
          <span>{challengeData.mapDetails?.name}</span>
        </div>

        <div className="challengeStartContent">
          <h1 className="challengeTitle">
            {challengeData.isDailyChallenge ? 'The Daily Challenge' : 'You have been challenged!'}
          </h1>
          {!challengeData.isDailyChallenge && (
            <div className="challengeCreator">
              <Avatar
                type="user"
                src={challengeData.creatorAvatar.emoji}
                backgroundColor={challengeData.creatorAvatar.color}
                size={32}
              />
              <div className="challengeMessage">
                <span className="emphasizedText">{challengeData.creatorName}</span>
                <span> challenged you to play </span>
                <span className="emphasizedText">{challengeData?.mapDetails?.name}</span>
              </div>
            </div>
          )}

          <button className="challengeBtn" onClick={() => handleButtonClick()}>
            {isLoggedIn ? 'Play Game' : 'Create Account'}
          </button>
        </div>
      </div>

      <div className="challengeSettings">
        <div className="settingsItem">
          <Icon size={24} fill={!HAS_TIME_LIMIT ? 'var(--green-300)' : '#888'}>
            <ClockIcon />
          </Icon>
          {HAS_TIME_LIMIT ? `${formatTimeLimit(TIME_LIMIT)} per round` : 'No Time Limit'}
        </div>

        <div className="settingsItem">
          <Icon size={24} fill={CAN_MOVE ? 'var(--green-300)' : '#888'}>
            <ArrowsExpandIcon />
          </Icon>
          {CAN_MOVE ? 'Moving Allowed' : 'No Move'}
        </div>

        <div className="settingsItem">
          <Icon size={24} fill={CAN_PAN ? 'var(--green-300)' : '#888'}>
            <SwitchHorizontalIcon />
          </Icon>
          {CAN_PAN ? 'Panning Allowed' : 'No Pan'}
        </div>

        <div className="settingsItem">
          <Icon size={24} fill={CAN_ZOOM ? 'var(--green-300)' : '#888'}>
            <ZoomInIcon />
          </Icon>
          {CAN_ZOOM ? 'Zooming Allowed' : 'No Zoom'}
        </div>
      </div>
    </StyledChallengeStart>
  )
}

export default ChallengeStart
