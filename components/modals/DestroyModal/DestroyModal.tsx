import { FC } from 'react'
import { Button, Modal, Spinner } from '@components/system'
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
          </div>

          <p className="message">{message}</p>
        </div>

        <div className="footer">
          <Button variant="solidGray" size="md" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destroy" size="md" onClick={onAction} disabled={isSubmitting}>
            {isSubmitting ? <Spinner size={20} /> : 'Delete'}
          </Button>
        </div>
      </StyledDestroyModal>
    </Modal>
  )
}

export default DestroyModal
