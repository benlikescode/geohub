import { FlagIcon, LocationMarkerIcon } from '@heroicons/react/outline'
import React, { FC, useState } from 'react'
import { StyledStreetViewControls } from '.'
import { Button, Icon, Tooltip } from '../System'

type Props = {
  compassHeading: number
}

const StreetViewControls: FC<Props> = ({ compassHeading }) => {
  const [showTip1, setShowTip1] = useState(false)
  const [showTip2, setShowTip2] = useState(false)

  return (
    <StyledStreetViewControls rotation={compassHeading}>
      <div className="compass">
        <img src="/images/compass.svg" alt="" />
      </div>

      <div className="controlBtn" onMouseEnter={() => setShowTip1(true)} onMouseLeave={() => setShowTip1(false)}>
        <Button type="iconRounded">
          <Icon size={24} fill="#fff">
            <LocationMarkerIcon />
          </Icon>
        </Button>
      </div>

      <div className="controlBtn" onMouseEnter={() => setShowTip2(true)} onMouseLeave={() => setShowTip2(false)}>
        <Button type="iconRounded">
          <Icon size={24} fill="#fff">
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
