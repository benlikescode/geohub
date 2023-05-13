/* eslint-disable react/display-name */

import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock'
import React, { createRef, forwardRef, ReactNode, useEffect, useImperativeHandle, useState } from 'react'
import { createPortal } from 'react-dom'

import { KEY_CODES } from '@utils/constants/keyCodes'

import { StyledModal } from './'

type Props = {
  children: ReactNode
  noOverflow?: boolean
  maxWidth?: string
  isOpen?: boolean
  onClose: () => void
}

const Dialog = forwardRef<HTMLDivElement, Props>(
  ({ children, noOverflow = true, maxWidth, isOpen = true, onClose }, ref) => {
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

    // Close modal on ESC key
    useEffect(() => {
      document.addEventListener('keydown', handleKeyDown)

      return () => {
        document.removeEventListener('keydown', handleKeyDown)
      }
    }, [])

    const handleKeyDown = async (e: KeyboardEvent) => {
      if (e.key === KEY_CODES.ESCAPE || e.key === KEY_CODES.ESCAPE_IE11) {
        onClose()
      }
    }

    const Element = (
      <StyledModal ref={ref} noOverflow={noOverflow} maxWidth={maxWidth} isOpen={isOpen} showCloseAnim={showCloseAnim}>
        <dialog open className="modal">
          <div ref={modalRef} className="modal-content">
            {children}
          </div>
        </dialog>
        <div tabIndex={-1} className="backdrop" onClick={() => onClose()} />
      </StyledModal>
    )

    if (!isOpen) {
      return <></>
    }

    // Render the modal outside of the DOM hierarchy of the parent component
    return createPortal(Element, document.getElementById('__next') as HTMLElement)
  }
)

export default Dialog
