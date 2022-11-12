/*
import { FC, ReactNode } from 'react'
import { StyledModal } from "@components/Modals/Modal"

type Props = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

const Modal: FC<Props> = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null
  }

  return (
    <StyledModal>
      <dialog open={isOpen}>
        {children}
      </dialog>
      <div tabIndex={-1} className="backdrop" onClick={() => onClose()} />
    </StyledModal>
  )
}

export default Modal
*/

import React, { useState, useEffect, ReactNode, createRef, forwardRef, useImperativeHandle } from 'react'
import { createPortal } from 'react-dom'
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import { StyledModal } from '.'

type Props = {
  children: ReactNode
  noOverflow?: boolean
  isOpen?: boolean
  onClose: () => void
}

const Dialog = forwardRef<HTMLDivElement, Props>(({ children, noOverflow = true, isOpen = true, onClose }, ref) => {
  const [showCloseAnim, setShowCloseAnim] = useState(false)
  const modalRef = createRef<HTMLDivElement>()
  const CLOSE_ANIM_LENGTH = 100

  // Waits for the close animation to finish before
  // un-rendering the component
  const handleClose = () => {
    setShowCloseAnim(true)
    setTimeout(() => onClose(), CLOSE_ANIM_LENGTH)
  }

  // This exposes the handleClose logic to any
  // parent component (such as ActionDialog)
  useImperativeHandle(ref, () => ({ close: () => handleClose() } as any))

  useEffect(() => {
    setShowCloseAnim(false)

    const modal = modalRef.current

    if (!!modal && isOpen) {
      modal.focus()
      return disableBodyScroll(modal)
    }

    clearAllBodyScrollLocks()
  }, [modalRef.current, isOpen])

  // Ensures the user can always scroll when the modal is hidden
  useEffect(() => {
    return () => {
      clearAllBodyScrollLocks()
    }
  }, [])

  const Element = (
    <StyledModal ref={ref} noOverflow={noOverflow} isOpen={isOpen} showCloseAnim={showCloseAnim}>
      <dialog open className="modal">
        <div ref={modalRef} className="modal-content">
          {children}
        </div>
      </dialog>
      <div tabIndex={-1} className="backdrop" onClick={() => handleClose()} />
    </StyledModal>
  )

  if (!isOpen) {
    return <></>
  }

  // Render the modal outside of the DOM hierarchy of the parent component
  return createPortal(Element, document.getElementById('__next') as HTMLElement)
})

export default Dialog
