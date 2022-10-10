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
      <div className="controlBtn" onMouseOver={() => setShowTip(true)} onMouseOut={() => setShowTip(false)}>
        <Button type="iconRounded" callback={handleBackToStart}>
          <Icon size={24} fill="#fff">
            <FlagIcon />
          </Icon>
        </Button>
        {showTip && <Tooltip label="Back To Start" position="left" />}
      </div>
    </StyledStreetViewControls>
  )
}

export default StreetViewControls
