/* eslint-disable @next/next/no-img-element */
import React, { FC, useState } from 'react'
import { CheckIcon } from '@heroicons/react/outline'
import { useAppSelector } from '@redux/hook'
import { BACKGROUND_COLORS, EMOJIS } from '@utils/constants/avatarOptions'
import { MainModal } from '../'
import { StyledAvatarPickerModal } from './'

type Props = {
  isOpen: boolean
  closeModal: () => void
  setNewUserDetails: (changedValues: any) => void
}

const AvatarPickerModal: FC<Props> = ({ isOpen, closeModal, setNewUserDetails }) => {
  const user = useAppSelector((state) => state.user)

  const [selectedColor, setSelectedColor] = useState(user.avatar?.color || BACKGROUND_COLORS[0])
  const [selectedEmoji, setSelectedEmoji] = useState(user.avatar?.emoji || '')

  const handleActionButton = async () => {
    const newAvatar = { emoji: selectedEmoji, color: selectedColor }
    setNewUserDetails({ avatar: newAvatar })
    closeModal()
  }

  return (
    <MainModal title="Customize Avatar" isOpen={isOpen} onClose={closeModal} onAction={handleActionButton}>
      <StyledAvatarPickerModal>
        <div>
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
                    <CheckIcon />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {selectedColor && (
          <div>
            <h2 className="color-selection-title">Choose an emoji</h2>

            <div className="color-options-wrapper">
              {EMOJIS.map((emoji, idx) => (
                <div
                  key={idx}
                  style={{ backgroundColor: selectedColor }}
                  className={`color-option ${selectedEmoji === emoji ? 'selected' : ''}`}
                  onClick={() => setSelectedEmoji(emoji)}
                >
                  <img
                    src={`https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/${emoji}.svg`}
                    alt={emoji}
                    className="emoji"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </StyledAvatarPickerModal>
    </MainModal>
  )
}

export default AvatarPickerModal
