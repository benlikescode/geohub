import { FC } from 'react'
import { StyledDailyQuotaModal } from '.'
import { Button, Modal } from '@components/system'
import { XIcon } from '@heroicons/react/outline'
import Link from 'next/link'

type Props = {
  isOpen: boolean
  closeModal: () => void
}

const DailyQuotaModal: FC<Props> = ({ isOpen, closeModal }) => {
  return (
    <Modal isOpen={isOpen} onClose={closeModal} maxWidth="500px">
      <StyledDailyQuotaModal>
        <div className="modal-section">
          <div className="header">
            <h2 className="modal-title">The Daily Quota Has Been Reached</h2>
            <button className="close-button" onClick={closeModal}>
              <XIcon />
            </button>
          </div>

          <p className="modal-text">
            To keep GeoHub free, there is a limit to how many games can be played each day.
            <span> The daily quota resets at midnight (PT)</span>.
          </p>
        </div>

        <div className="modal-section">
          <h3 className="support-title">{`Don't want to wait?`}</h3>
          <p className="modal-text">
            Adding your own key lets you continue to play for free, without costing us money!
          </p>
          <div className="support-links">
            <Link href="/user/settings">
              <a className="support-link">Add Key</a>
            </Link>
            <a
              className="support-link donate"
              href="https://www.buymeacoffee.com/geohubgame"
              target="_blank"
              rel="noreferrer"
            >
              Donate
            </a>
          </div>
        </div>
      </StyledDailyQuotaModal>
    </Modal>
  )
}

export default DailyQuotaModal
