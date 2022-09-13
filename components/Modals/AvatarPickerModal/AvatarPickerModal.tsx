import { CheckIcon } from '@heroicons/react/outline'
import React, { FC, useState } from 'react'
import { StyledAvatarPickerModal } from '.'
import { Modal } from '../Modal'

type Props = {
  closeModal: () => void
}

const EMOJIS = ['1f3b1', '26bd', '1f3c6', '1f34c', '1f334', '1f435', '1f4a9', '1f47b', '1f355']
const BACKGROUND_COLORS = ['#fee2e2', '#fb923c', '#4a3b00', '#4ade80', '#38bdf8', '#c084fc', '#f472b6']

const AvatarPickerModal: FC<Props> = ({ closeModal }) => {
  const [selectedColor, setSelectedColor] = useState('')
  const [currentView, setCurrentView] = useState<'Background' | 'Emoji'>('Background')

  const handleActionButton = () => {
    if (currentView === 'Background') {
      setCurrentView('Emoji')
    }

    if (currentView === 'Emoji') {
      closeModal()
    }
  }

  return (
    <Modal closeModal={closeModal} title="Customize Avatar" onActionButton={handleActionButton}>
      <StyledAvatarPickerModal>
        {currentView === 'Background' && (
          <>
            <h2 className="color-selection-title">Choose a background color</h2>

            <div className="color-options-wrapper">
              {BACKGROUND_COLORS.map((color, idx) => (
                <div
                  key={idx}
                  style={{ backgroundColor: color }}
                  className="color-option"
                  onClick={() => setSelectedColor(color)}
                >
                  {selectedColor === color && (
                    <div className="checkmark-wrapper">
                      <CheckIcon height={20} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {currentView === 'Emoji' && (
          <>
            <h2 className="color-selection-title">Choose an emoji</h2>

            <div className="color-options-wrapper">
              {EMOJIS.map((emoji, idx) => (
                <div key={idx} style={{ backgroundColor: selectedColor }} className="color-option">
                  <img
                    src={`https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/${emoji}.svg`}
                    alt={emoji}
                    className="emoji"
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </StyledAvatarPickerModal>
    </Modal>
  )
}

export default AvatarPickerModal
