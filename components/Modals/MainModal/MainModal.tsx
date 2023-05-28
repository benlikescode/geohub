import { FC, ReactNode } from 'react'
import { Spinner } from '@components/System'
import { Modal } from '@components/System/Modal'
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
          <button className="cancel-button" onClick={onCancel ?? onClose}>
            {cancelButtonText || 'Cancel'}
          </button>

          <button className="action-button" onClick={onAction} disabled={isSubmitting}>
            {isSubmitting ? <Spinner size={18} /> : actionButtonText || 'Confirm'}
          </button>
        </div>
      </StyledMainModal>
    </Modal>
  )
}

export default MainModal
