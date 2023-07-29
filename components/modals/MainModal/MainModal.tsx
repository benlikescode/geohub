import { FC, ReactNode } from 'react'
import { Button, Modal, Spinner } from '@components/system'
import { XIcon } from '@heroicons/react/outline'
import { StyledMainModal } from './'

type Props = {
  title: string
  actionButtonText?: string
  cancelButtonText?: string
  children: ReactNode
  isOpen: boolean
  onClose: () => void
  onAction: () => void
  onCancel?: () => void
  isSubmitting?: boolean
  maxWidth?: string
}

const MainModal: FC<Props> = ({
  title,
  actionButtonText,
  cancelButtonText,
  children,
  isOpen,
  onClose,
  onAction,
  onCancel,
  isSubmitting,
  maxWidth,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth={maxWidth ?? '650px'}>
      <StyledMainModal>
        <div className="modal-header">
          <h1 className="modal-title">{title}</h1>
          <button className="close-button" onClick={onClose}>
            <XIcon />
          </button>
        </div>
        <div className="modal-body">{children}</div>

        <div className="modal-footer">
          <Button variant="solidGray" onClick={onCancel ?? onClose} padding="0 16px">
            {cancelButtonText || 'Cancel'}
          </Button>

          <Button onClick={onAction} isLoading={isSubmitting} padding="0 16px">
            {actionButtonText || 'Confirm'}
          </Button>
        </div>
      </StyledMainModal>
    </Modal>
  )
}

export default MainModal
