import { FlagIcon, LocationMarkerIcon } from '@heroicons/react/outline'
import React, { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { StyledStreetViewControls } from '.'
import { returnToStart } from '../../redux/game'
import { Button, Icon, Tooltip } from '../System'

const StreetViewControls: FC = () => {
  const [showTip1, setShowTip1] = useState(false)
  const [showTip2, setShowTip2] = useState(false)
  const dispatch = useDispatch()

  const handleBackToStart = () => {
    dispatch(returnToStart({
      atStart: true
    }))
    // temp solution lol
    window.location.reload()
  }

  const handleSetCheckpoint = () => {

  }

  return (
    <StyledStreetViewControls>
      <div className="controlBtn" onMouseEnter={() => setShowTip1(true)} onMouseLeave={() => setShowTip1(false)}>
        <Button type="iconRounded" callback={handleSetCheckpoint}>
          <Icon size={24} fill="var(--color2)">
            <LocationMarkerIcon />
          </Icon>
        </Button>
      </div>

      <div className="controlBtn" onMouseEnter={() => setShowTip2(true)} onMouseLeave={() => setShowTip2(false)}>
        <Button type="iconRounded" callback={handleBackToStart}>
          <Icon size={24} fill="var(--color2)">
            <FlagIcon />
          </Icon>
        </Button>
      </div>

      {showTip1 && <Tooltip label="Create Checkpoint" top={90} left={70} />}
      {showTip2 && <Tooltip label="Back To Start" top={145} left={70} />}
    </StyledStreetViewControls>
    
  )
}

export default StreetViewControls
