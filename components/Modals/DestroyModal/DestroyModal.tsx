import React, { FC } from 'react'

import { Button, Spinner } from '@components/System'
import { Modal } from '@components/System/Modal'
import { XIcon } from '@heroicons/react/outline'

import { StyledDestroyModal } from './'

type Props = {
  title: string
  message: string
  isOpen: boolean
  onClose: () => void
  onAction: () => void
  isSubmitting?: boolean
}

const DestroyModal: FC<Props> = ({ title, message, isOpen, onClose, onAction, isSubmitting }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <StyledDestroyModal>
        <div className="a">
          <div className="header">
            <p className="title">{title}</p>
            {/*   <button className="close-button" onClick={onClose}>
              <XIcon />
            </button> */}
          </div>

          <p className="message">{message}</p>
        </div>

        <div className="footer">
          <Button type="solidGray" size="md" callback={onClose}>
            Cancel
          </Button>
          <Button type="destroy" size="md" callback={onAction} isDisabled={isSubmitting}>
            {isSubmitting ? <Spinner size={20} /> : 'Delete'}
          </Button>
        </div>
      </StyledDestroyModal>
    </Modal>
  )
}

export default DestroyModal
