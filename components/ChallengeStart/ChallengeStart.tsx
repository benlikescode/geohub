import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { Avatar } from '@components/system'
import {
  ArrowsExpandIcon,
  ClockIcon,
  LocationMarkerIcon,
  SwitchHorizontalIcon,
  ZoomInIcon,
} from '@heroicons/react/outline'
import { useAppSelector } from '@redux/hook'
import { ChallengeType, GameViewType } from '@types'
import { MAP_AVATAR_PATH } from '@utils/constants/random'
import { formatTimeLimit, redirectToRegister } from '@utils/helpers'
import { StyledChallengeStart } from './'

type Props = {
  challengeData: ChallengeType
  handleStartChallenge: (challengeData: ChallengeType) => void
}

const ChallengeStart: FC<Props> = ({ challengeData, handleStartChallenge }) => {
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

  const handleButtonClick = () => {
    if (isLoggedIn) {
      handleStartChallenge(challengeData)
    } else {
      redirectToRegister(router)
    }
  }

  return (
    <StyledChallengeStart>
      <div className="challengeStartWrapper">
        <Image
          src={`${MAP_AVATAR_PATH}/${challengeData?.mapDetails?.previewImg}`}
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
              />
              <div className="challengeMessage">
                <span className="emphasizedText">{challengeData.creatorName}</span>
                <span> challenged you to play </span>
                <span className="emphasizedText">
                  {challengeData.mode === 'streak' ? 'Country Streaks' : challengeData?.mapDetails?.name}
                </span>
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
          <ClockIcon color={!HAS_TIME_LIMIT ? 'var(--green-300)' : '#888'} />

          {HAS_TIME_LIMIT ? `${formatTimeLimit(TIME_LIMIT)} per round` : 'No Time Limit'}
        </div>

        <div className="settingsItem">
          <ArrowsExpandIcon color={CAN_MOVE ? 'var(--green-300)' : '#888'} />

          {CAN_MOVE ? 'Moving Allowed' : 'No Move'}
        </div>

        <div className="settingsItem">
          <SwitchHorizontalIcon color={CAN_PAN ? 'var(--green-300)' : '#888'} />

          {CAN_PAN ? 'Panning Allowed' : 'No Pan'}
        </div>

        <div className="settingsItem">
          <ZoomInIcon color={CAN_ZOOM ? 'var(--green-300)' : '#888'} />

          {CAN_ZOOM ? 'Zooming Allowed' : 'No Zoom'}
        </div>
      </div>
    </StyledChallengeStart>
  )
}

export default ChallengeStart
