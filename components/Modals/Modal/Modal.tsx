import { FC, ReactNode } from 'react'
import ReactDOM from 'react-dom'

import { StyledModal } from './'

type Props = {
  width?: string;
  closeModal: () => void
  children: ReactNode
}

const Modal: FC<Props> = ({ width, closeModal, children }) => {
  return ReactDOM.createPortal(
    <StyledModal width={width}>
      <div className="layerContainer">
        <div className="modal">
          <div className="modalBody">
          { children }
          </div>
        </div>
        <div className="backdrop" onClick={() => closeModal()} />
      </div>
    </StyledModal>, 
    document.getElementById('__next') as HTMLElement
  )
}

export default Modal