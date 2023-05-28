import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { Avatar } from '@components/System'
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

  useEffect(() => {
    if (!user.id) {
      setIsLoggedIn(false)
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
      <div className="challenge-start-wrapper">
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

        <div className="challenge-start-content">
          <h1 className="challenge-title">
            {challengeData.isDailyChallenge ? 'The Daily Challenge' : 'You have been challenged!'}
          </h1>
          {!challengeData.isDailyChallenge && (
            <div className="challenge-creator">
              <Avatar
                type="user"
                src={challengeData.creatorAvatar.emoji}
                backgroundColor={challengeData.creatorAvatar.color}
                size={32}
              />
              <div className="challenge-message">
                <span className="emphasized-text">{challengeData.creatorName}</span>
                <span> challenged you to play </span>
                <span className="emphasized-text">
                  {challengeData.mode === 'streak' ? 'Country Streaks' : challengeData?.mapDetails?.name}
                </span>
              </div>
            </div>
          )}

          <button className="challenge-btn" onClick={() => handleButtonClick()}>
            {isLoggedIn ? 'Play Game' : 'Create Account'}
          </button>
        </div>
      </div>

      <div className="challenge-settings">
        <div className="settings-item">
          <ClockIcon color={!HAS_TIME_LIMIT ? 'var(--green-300)' : '#888'} />

          {HAS_TIME_LIMIT ? `${formatTimeLimit(TIME_LIMIT)} per round` : 'No Time Limit'}
        </div>

        <div className="settings-item">
          <ArrowsExpandIcon color={CAN_MOVE ? 'var(--green-300)' : '#888'} />

          {CAN_MOVE ? 'Moving Allowed' : 'No Move'}
        </div>

        <div className="settings-item">
          <SwitchHorizontalIcon color={CAN_PAN ? 'var(--green-300)' : '#888'} />

          {CAN_PAN ? 'Panning Allowed' : 'No Pan'}
        </div>

        <div className="settings-item">
          <ZoomInIcon color={CAN_ZOOM ? 'var(--green-300)' : '#888'} />

          {CAN_ZOOM ? 'Zooming Allowed' : 'No Zoom'}
        </div>
      </div>
    </StyledChallengeStart>
  )
}

export default ChallengeStart
