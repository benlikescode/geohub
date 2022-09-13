/* eslint-disable @next/next/no-img-element */
import React, { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { mailman } from '@backend/utils/mailman'
import { CheckIcon } from '@heroicons/react/outline'
import { selectUser } from '@redux/user'
import { BACKGROUND_COLORS, EMOJIS } from '@utils/constants/avatarOptions'

import { Modal } from '../Modal'
import { StyledAvatarPickerModal } from './'

type Props = {
  closeModal: () => void
  setNewUserDetails: (changedValues: any) => void
}

const AvatarPickerModal: FC<Props> = ({ closeModal, setNewUserDetails }) => {
  const user = useSelector(selectUser)

  const [selectedColor, setSelectedColor] = useState(user.avatar?.color || BACKGROUND_COLORS[0])
  const [selectedEmoji, setSelectedEmoji] = useState(user.avatar?.emoji || '')

  const handleActionButton = async () => {
    const newAvatar = { emoji: selectedEmoji, color: selectedColor }
    setNewUserDetails({ avatar: newAvatar })
    closeModal()
  }

  return (
    <Modal closeModal={closeModal} title="Customize Avatar" onActionButton={handleActionButton}>
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
                    <CheckIcon height={20} />
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
    </Modal>
  )
}

export default AvatarPickerModal
