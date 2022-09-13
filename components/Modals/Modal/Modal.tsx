import { FC, ReactNode } from 'react'
import ReactDOM from 'react-dom'
import { XIcon } from '@heroicons/react/outline'
import { Button, Icon } from '../../System'

import { StyledModal } from './'

type Props = {
  width?: string
  closeModal: () => void
  isCustom?: boolean
  title?: string
  actionButtonText?: string
  onActionButton?: () => any
  children: ReactNode
}

const Modal: FC<Props> = ({ width, closeModal, isCustom, title, actionButtonText, onActionButton, children }) => {
  return ReactDOM.createPortal(
    <StyledModal width={width}>
      <div className="layerContainer">
        <div className="modal">
          {isCustom ? (
            children
          ) : (
            <>
              <div className="modal-header">
                <h1 className="modal-title">{title}</h1>
                <Button type="icon" callback={() => closeModal()}>
                  <Icon size={30} hoverColor="var(--color2)">
                    <XIcon />
                  </Icon>
                </Button>
              </div>
              <div className="modal-body">{children}</div>
              <div className="modal-footer">
                <button className="action-button" onClick={onActionButton}>
                  {actionButtonText || 'Confirm'}
                </button>
              </div>
            </>
          )}
        </div>
        <div className="backdrop" onClick={() => closeModal()} />
      </div>
    </StyledModal>,
    document.getElementById('__next') as HTMLElement
  )
}

export default Modal
