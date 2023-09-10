import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { Avatar, Checkbox, Slider, ToggleSwitch } from '@components/system'
import { TextWithLinks } from '@components/TextWithLinks'
import { UserGroupIcon, UserIcon } from '@heroicons/react/outline'
import { useAppDispatch, useAppSelector } from '@redux/hook'
import { resetGameSettings, updateGameSettings, updateStartTime } from '@redux/slices'
import { GameSettingsType, GameType, MapType, UserType } from '@types'
import { formatTimeLimit, mailman, showToast } from '@utils/helpers'
import { MainModal } from '../MainModal'
import { StyledGameSettingsModal } from './'
import { Challenge } from './Challenge'

type Props = {
  isOpen: boolean
  closeModal: () => void
  mapDetails: Pick<MapType, '_id' | 'name' | 'description' | 'previewImg'>
  gameMode: GameType['mode']
}

const GameSettingsModal: FC<Props> = ({ isOpen, closeModal, mapDetails, gameMode }) => {
  const user: UserType = useAppSelector((state) => state.user)

  const [showDetailedChecked, setShowDetailedChecked] = useState(
    typeof user.gameSettings === 'undefined' ||
      (user.gameSettings?.canMove &&
        user.gameSettings?.canPan &&
        user.gameSettings?.canZoom &&
        user.gameSettings?.timeLimit === 0)
  )
  const [canMove, setCanMove] = useState(user.gameSettings?.canMove ?? true)
  const [canPan, setCanPan] = useState(user.gameSettings?.canPan ?? true)
  const [canZoom, setCanZoom] = useState(user.gameSettings?.canZoom ?? true)
  const [gameType, setGameType] = useState<'Single Player' | 'Challenge'>('Single Player')
  const [showChallengeView, setShowChallengeView] = useState(false)
  const [sliderVal, setSliderVal] = useState(user.gameSettings?.timeLimit ?? 0)
  const [challengeId, setChallengeId] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const dispatch = useAppDispatch()

  const handleCancelButton = () => {
    showChallengeView ? setShowChallengeView(false) : closeModal()
  }

  const handleActionButton = async () => {
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
      setIsSubmitting(true)

      // store game settings
      dispatch(updateGameSettings({ gameSettings: { canMove, canPan, canZoom, timeLimit: sliderVal } }))

      router.push(`/challenge/${challengeId}`)
    }
  }

  const createChallenge = async () => {
    if (!user.id) {
      return router.push('/register')
    }

    setIsSubmitting(true)

    const gameSettings: GameSettingsType = {
      timeLimit: sliderVal * 10,
      canMove,
      canPan,
      canZoom,
    }

    const gameData = {
      mapId: mapDetails._id,
      gameSettings,
      mode: gameMode,
    }

    const res = await mailman('challenges', 'POST', JSON.stringify(gameData))

    setIsSubmitting(false)
    setChallengeId(res)
  }

  const handleStartGame = async () => {
    if (!user.id) {
      return router.push('/register')
    }

    setIsSubmitting(true)

    const gameSettings: GameSettingsType = {
      timeLimit: sliderVal * 10,
      canMove,
      canPan,
      canZoom,
    }

    const gameData = {
      mapId: mapDetails._id,
      gameSettings,
      mode: gameMode,
    }

    // store start time
    dispatch(updateStartTime({ startTime: new Date().getTime() }))

    // store game settings
    dispatch(updateGameSettings({ gameSettings: { canMove, canPan, canZoom, timeLimit: sliderVal } }))

    const res = await mailman('games', 'POST', JSON.stringify(gameData))

    if (res.error) {
      setIsSubmitting(false)
      return showToast('error', res.error.message)
    }

    router.push(`/game/${res._id}`)
  }

  const handleCheck = () => {
    // If we uncheck => show the settings container
    if (showDetailedChecked) {
      setShowDetailedChecked(false)
    }

    // If we check => reset settings to default
    else {
      dispatch(resetGameSettings())
      setShowDetailedChecked(true)
      setCanMove(true)
      setCanPan(true)
      setCanZoom(true)
      setSliderVal(0)
    }
  }

  return (
    <MainModal
      title={showChallengeView ? 'Start Challenge' : 'Start Game'}
      actionButtonText={gameType === 'Single Player' ? 'Start' : showChallengeView ? 'Start' : 'Invite'}
      cancelButtonText={showChallengeView ? 'Back' : 'Cancel'}
      isOpen={isOpen}
      onClose={closeModal}
      onCancel={handleCancelButton}
      onAction={handleActionButton}
      isSubmitting={isSubmitting}
    >
      <StyledGameSettingsModal>
        <div className="mainContent">
          {showChallengeView ? (
            <Challenge challengeId={challengeId} />
          ) : (
            <>
              <div className="map-details-wrapper">
                <Avatar type="map" src={mapDetails.previewImg} size={50} />
                <div className="map-details">
                  <span className="map-name">{mapDetails.name}</span>
                  <span className="map-description">
                    <TextWithLinks>{mapDetails.description}</TextWithLinks>
                  </span>
                </div>
              </div>

              <div className="toggleBar">
                <div
                  className={`toggleItemWrapper ${gameType === 'Single Player' ? 'active' : ''}`}
                  onClick={() => setGameType('Single Player')}
                >
                  <div className="toggle-item">
                    <div className="toggleIcon">
                      <UserIcon />
                    </div>
                    <span className="toggleText">Single Player</span>
                  </div>
                </div>

                <div
                  className={`toggleItemWrapper ${gameType === 'Challenge' ? 'active' : ''}`}
                  onClick={() => setGameType('Challenge')}
                >
                  <div className="toggle-item">
                    <div className="toggleIcon">
                      <UserGroupIcon />
                    </div>
                    <span className="toggleText">Challenge</span>
                  </div>
                </div>
              </div>

              <div className="settingsWrapper">
                <div className="checkboxWrapper">
                  <Checkbox
                    isChecked={!!showDetailedChecked}
                    setChecked={() => handleCheck()}
                    label="Default Settings: No time limit, moving allowed"
                  />
                </div>

                {!showDetailedChecked && (
                  <div className="detailedSettings">
                    <span className="roundTimeLabel">
                      Round Time: <span className="timeLimit">{formatTimeLimit(sliderVal * 10)}</span>
                    </span>

                    <div className="setting-options">
                      <div className="time-slider">
                        <Slider value={sliderVal} min={0} max={60} onChange={setSliderVal} />
                      </div>

                      <div className="movementOptions">
                        <div className="movementOption">
                          <ToggleSwitch isActive={canMove} setIsActive={setCanMove} />
                          <div className="movementOptionLabel">Move</div>
                        </div>

                        <div className="movementOption">
                          <ToggleSwitch isActive={canZoom} setIsActive={setCanZoom} />
                          <div className="movementOptionLabel">Zoom</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </StyledGameSettingsModal>
    </MainModal>
  )
}

export default GameSettingsModal
