import React, { FC, useState } from 'react'

import { Button, Icon, Tooltip } from '@components/System'
import { FlagIcon } from '@heroicons/react/outline'

import { StyledStreetViewControls } from './'

type Props = {
  handleBackToStart: () => void
}

const StreetViewControls: FC<Props> = ({ handleBackToStart }) => {
  const [showTip, setShowTip] = useState(false)

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
