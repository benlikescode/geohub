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
      <div className="control-button-wrapper" onMouseOver={() => setShowTip(true)} onMouseOut={() => setShowTip(false)}>
        <Button className="control-button" type="iconRounded" callback={handleBackToStart}>
          <FlagIcon />
        </Button>
        {showTip && <Tooltip label="Back To Start" position="left" />}
      </div>
    </StyledStreetViewControls>
  )
}

export default StreetViewControls
