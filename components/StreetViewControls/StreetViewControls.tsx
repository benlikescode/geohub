import { FlagIcon, LocationMarkerIcon } from '@heroicons/react/outline'
import React, { FC, useState } from 'react'
import { StyledStreetViewControls } from '.'
import { Button, Icon, Tooltip } from '../System'

const StreetViewControls: FC = () => {
  const [showTip, setShowTip] = useState(false)

  const handleBackToStart = () => {
    // temp solution lol
    window.location.reload()
  }

  return (
    <StyledStreetViewControls>
      <div className="controlBtn" onMouseEnter={() => setShowTip(true)} onMouseLeave={() => setShowTip(false)}>
        <Button type="iconRounded" callback={handleBackToStart}>
          <Icon size={24} fill="var(--color2)">
            <FlagIcon />
          </Icon>
        </Button>
      </div>

      {showTip && <Tooltip label="Back To Start" top={8} left={60} />}
    </StyledStreetViewControls>  
  )
}

export default StreetViewControls
