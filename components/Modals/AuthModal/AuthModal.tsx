import Link from 'next/link'
import { FC } from 'react'
import { Button, Modal } from '@components/System'
import { XIcon } from '@heroicons/react/outline'
import { StyledAuthModal } from './'

type Props = {
  isOpen: boolean
  closeModal: () => void
}

const AuthModal: FC<Props> = ({ isOpen, closeModal }) => {
  return (
    <Modal isOpen={isOpen} onClose={closeModal} maxWidth="400px">
      <StyledAuthModal>
        <div className="header">
          <h1 className="modal-title">Login To GeoHub</h1>
          <button className="close-button" onClick={closeModal}>
            <XIcon />
          </button>
        </div>

        <div className="main-content">
          <div className="buttons-wrapper">
            <Link href="/login">
              <a>
                <Button variant="solidCustom" backgroundColor="#3d3d3d" color="#fff" hoverColor="#444" width="100%">
                  Login
                </Button>
              </a>
            </Link>

            <Link href="/register">
              <a>
                <Button width="100%">Sign Up</Button>
              </a>
            </Link>
          </div>
        </div>
      </StyledAuthModal>
    </Modal>
  )
}

export default AuthModal
