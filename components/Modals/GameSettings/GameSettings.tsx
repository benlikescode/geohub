import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { mailman } from '@backend/utils/mailman'
import { Avatar, Checkbox, FlexGroup, Icon, Slider } from '@components/System'
import {
  ArrowsExpandIcon,
  ClockIcon,
  SwitchHorizontalIcon,
  UserGroupIcon,
  UserIcon,
  ZoomInIcon
} from '@heroicons/react/outline'
import { updateStartTime } from '@redux/game'
import { selectUser, updateLocation } from '@redux/user'
import { GameSettingsType, LocationType, MapType, UserType } from '@types'
import { formatTimeLimit, showErrorToast } from '@utils/helperFunctions'

import { Modal } from '../Modal'
import { StyledGameSettings } from './'
import { Challenge } from './Challenge'

type Props = {
  closeModal: () => void
  mapDetails: MapType
}

const GameSettings: FC<Props> = ({ closeModal, mapDetails }) => {
  const [showDetailedChecked, setShowDetailedChecked] = useState(true)
  const [movingChecked, setMovingChecked] = useState(true)
  const [panningChecked, setPanningChecked] = useState(true)
  const [zoomingChecked, setZoomingChecked] = useState(true)
  const [gameType, setGameType] = useState<'Single Player' | 'Challenge'>('Single Player')
  const [showChallengeView, setShowChallengeView] = useState(false)
  const [sliderVal, setSliderVal] = useState(61)
  const [challengeId, setChallengeId] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const user: UserType = useSelector(selectUser)
  const dispatch = useDispatch()
  const mapId = router.asPath.split('/')[2]

  useEffect(() => {
    if (mapId === 'near-you') {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function showLocation(position) {
          const latitude = position.coords.latitude
          const longitude = position.coords.longitude

          const location: LocationType = {
            lat: latitude,
            lng: longitude,
          }

          dispatch(updateLocation({ location }))
        })
      }
    }
  }, [])

  const handleClickBtn = async () => {
    setIsSubmitting(true)

    // Case 1: Single Player & Start
    if (gameType === 'Single Player' && !showChallengeView) {
      await handleStartGame()
    }
    // Case 2: Challenge & Invite Friends
    if (gameType === 'Challenge' && !showChallengeView) {
      await createChallenge()
      setShowChallengeView(true)
    }
    // Case 3: Challenge & Start
    if (gameType === 'Challenge' && showChallengeView) {
      router.push(`/challenge/${challengeId}`)
    }

    setIsSubmitting(false)
  }

  const createChallenge = async () => {
    if (!user.id) {
      return router.push('/register')
    }

    const gameSettings: GameSettingsType = {
      timeLimit: sliderVal,
      canMove: movingChecked,
      canPan: panningChecked,
      canZoom: zoomingChecked,
    }

    const gameData = {
      mapId,
      gameSettings,
      userId: user.id,
    }

    const { status, res } = await mailman('challenges', 'POST', JSON.stringify(gameData))

    setChallengeId(res)
  }

  const handleStartGame = async () => {
    if (!user.id) {
      return router.push('/register')
    }

    const gameSettings: GameSettingsType = {
      timeLimit: sliderVal,
      canMove: movingChecked,
      canPan: panningChecked,
      canZoom: zoomingChecked,
    }

    const gameData = {
      mapId,
      gameSettings,
      userId: user.id,
      userLocation: user.location,
    }

    // store start time
    dispatch(updateStartTime({ startTime: new Date().getTime() }))

    const { status, res } = await mailman('games', 'POST', JSON.stringify(gameData))

    if (status === 400) {
      showErrorToast('This map does not seem to have any locations')
    } else {
      router.push(`/game/${res}`)
    }
  }

  return (
    <Modal
      closeModal={closeModal}
      title={showChallengeView ? 'Start Challenge' : 'Start Game'}
      onActionButton={handleClickBtn}
      actionButtonText={gameType === 'Single Player' ? 'Start' : showChallengeView ? 'Start' : 'Invite'}
      cancelButtonText="Cancel"
      isSubmitting={isSubmitting}
    >
      <StyledGameSettings>
        <div className="mainContent">
          {showChallengeView ? (
            <Challenge challengeId={challengeId} />
          ) : (
            <>
              <div className="test">
                <div className="test123">
                  <Avatar type="map" src={mapDetails.previewImg} size={50} />
                  <h2 className="mapName">{mapDetails.name}</h2>
                </div>
                <span className="mapDescription">{mapDetails.description}</span>
              </div>

              <div className="toggleBar">
                <div
                  className={`toggleItem ${gameType === 'Single Player' ? 'active' : ''}`}
                  onClick={() => setGameType('Single Player')}
                >
                  <FlexGroup gap={12}>
                    <div className="toggleIcon">
                      <UserIcon />
                    </div>
                    <span className="toggleText">Single Player</span>
                  </FlexGroup>
                </div>

                <div
                  className={`toggleItem ${gameType === 'Challenge' ? 'active' : ''}`}
                  onClick={() => setGameType('Challenge')}
                >
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
                  <Checkbox isChecked={showDetailedChecked} setChecked={setShowDetailedChecked} />
                  <span>Default Settings (No time limit, moving, panning, zooming allowed)</span>
                </div>

                {!showDetailedChecked && (
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
                        <Checkbox isChecked={movingChecked} setChecked={setMovingChecked} />
                        <FlexGroup>
                          <Icon size={24} fill="#888888">
                            <ArrowsExpandIcon />
                          </Icon>
                          <span>Moving</span>
                        </FlexGroup>
                      </div>
                      <div className="movementOption">
                        <Checkbox isChecked={panningChecked} setChecked={setPanningChecked} />
                        <FlexGroup>
                          <Icon size={24} fill="#888888">
                            <SwitchHorizontalIcon />
                          </Icon>
                          <span>Panning</span>
                        </FlexGroup>
                      </div>
                      <div className="movementOption">
                        <Checkbox isChecked={zoomingChecked} setChecked={setZoomingChecked} />
                        <FlexGroup>
                          <Icon size={24} fill="#888888">
                            <ZoomInIcon />
                          </Icon>
                          <span>Zooming</span>
                        </FlexGroup>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </StyledGameSettings>
    </Modal>
  )
}

export default GameSettings
