import { FC, useState } from 'react'
import { Tooltip } from '@components/system'
import { FlagIcon, ArrowLeftIcon } from '@heroicons/react/outline'
import { StyledStreetViewControls } from './'

type Props = {
  handleBackToStart: () => void,
  handleUndoLastMove?: () => void
}

const StreetViewControls: FC<Props> = ({ handleBackToStart, handleUndoLastMove }) => {
  const [showStartTip, setShowStartTip] = useState(false)
  const [showBackTip, setShowBackTip] = useState(false)

  return (
    <StyledStreetViewControls>
      <div className="control-button-wrapper" onMouseOver={() => setShowStartTip(true)} onMouseOut={() => setShowStartTip(false)}>
        <button className="control-button" onClick={handleBackToStart}>
          <FlagIcon />
        </button>
        {showStartTip && <Tooltip label="Back To Start (R)" position="left" />}
      </div>
      {handleUndoLastMove && (
        <div className="control-button-wrapper" onMouseOver={() => setShowBackTip(true)} onMouseOut={() => setShowBackTip(false)}>
          <button className="control-button" onClick={handleUndoLastMove}>
            <ArrowLeftIcon />
          </button>
          {showBackTip && <Tooltip label="Undo Last Move (Z)" position="left" />}
        </div>
      )}
    </StyledStreetViewControls>
  )
}

export default StreetViewControls
