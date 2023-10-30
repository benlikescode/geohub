import { FC, useState } from 'react'
import { Tooltip } from '@components/system'
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
        <button className="control-button" onClick={handleBackToStart}>
          <FlagIcon />
        </button>
        {showTip && <Tooltip label="Back To Start (R)" position="left" />}
      </div>
    </StyledStreetViewControls>
  )
}

export default StreetViewControls
