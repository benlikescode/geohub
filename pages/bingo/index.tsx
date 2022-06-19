import { CheckIcon } from '@heroicons/react/outline'
import type { NextPage } from 'next'
import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { mailman } from '../../backend/utils/mailman'
import { Layout, Banner } from '../../components/Layout'
import { BingoSettings } from '../../components/Modals/BingoSettings'
import { Modal } from '../../components/Modals/Modal'
import { Avatar, Button, Icon, Input } from '../../components/System'
import { selectUser } from '../../redux/user'
import StyledBingoPage from '../../styles/BingoPage.Styled'

const BingoPage: NextPage = () => {
  const [settingsModalOpen, setSettingsModalOpen] = useState(false)
  const [suggestion1, setSuggestion1] = useState('')
  const [suggestion2, setSuggestion2] = useState('')
  const user = useSelector(selectUser)

  const submitSuggestionDisabled = useMemo(
    () => !suggestion1 && !suggestion2,
    [suggestion1, suggestion2]
  )

  const closeModal = () => {
    setSettingsModalOpen(false)
  }

  const showErrorToast = () =>
    toast.error('Something went wrong, please try again later.', {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
      theme: 'dark',
    })

  const showSuccessToast = () =>
    toast.success('Thanks for your feedback.', {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
      theme: 'dark',
    })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const data = { user, suggestion1, suggestion2 }

    const { status } = await mailman('bingo/suggestions', 'POST', JSON.stringify(data))
    console.log(status)

    if (status === 200) {
      showSuccessToast()
    } else {
      showErrorToast()
    }
  }

  return (
    <StyledBingoPage>
      <Layout>
        <main>
          <Banner>
            <div className="mapDetailsSection">
              <div className="mapDescriptionWrapper">
                <Avatar url={'/images/bingoAvatar.jpg'} alt="Bingo" size={100} outline />

                <div className="descriptionColumnWrapper">
                  <div className="descriptionColumn">
                    <span className="name">Geo-Bingo</span>
                    <span className="description">
                      Given a bingo card of random things/people, your task is to search across the
                      world to find these items and get a Geo-Bingo!
                    </span>
                  </div>
                  <Button
                    type="solidPurple"
                    width="200px"
                    callback={() => setSettingsModalOpen(true)}
                  >
                    Play Now
                  </Button>
                </div>
              </div>

              <div className="bingoCard">
                <img src="/images/bingoCard.png" alt="Geo-Bingo Card" />
              </div>
            </div>
          </Banner>

          <Banner>
            <div className="bingoSuggestion">
              <div className="suggestionContent">
                <h2 className="suggestionTitle">Have a Bingo Item Suggestion?</h2>

                <div className="checkListSection">
                  <h4>What makes a good item?</h4>
                  <div className="checkList">
                    <div className="checkListItem">
                      <div className="checkIcon">
                        <Icon size={16} fill="var(--color1)">
                          <CheckIcon />
                        </Icon>
                      </div>
                      <span className="checkListLabel">
                        Something recognizable (cultural independent)
                      </span>
                    </div>

                    <div className="checkListItem">
                      <div className="checkIcon">
                        <Icon size={16} fill="var(--color1)">
                          <CheckIcon />
                        </Icon>
                      </div>
                      <span className="checkListLabel">Relatively short (under 40 characters)</span>
                    </div>

                    <div className="checkListItem">
                      <div className="checkIcon">
                        <Icon size={16} fill="var(--color1)">
                          <CheckIcon />
                        </Icon>
                      </div>
                      <span className="checkListLabel">Manageable to find (but not too easy)</span>
                    </div>
                  </div>
                </div>
              </div>

              <form className="suggestionForm" onSubmit={(e) => handleSubmit(e)}>
                <Input
                  placeholder="Ex. Fire Truck"
                  type="text"
                  label="Item 1"
                  maxLength={40}
                  callback={setSuggestion1}
                />

                <Input type="text" label="Item 2" maxLength={40} callback={setSuggestion2} />

                <Button type="solidPurple" width="100%" isDisabled={submitSuggestionDisabled}>
                  Submit
                </Button>
              </form>
            </div>
          </Banner>
        </main>
      </Layout>

      {settingsModalOpen && (
        <Modal closeModal={closeModal}>
          <BingoSettings closeModal={closeModal} />
        </Modal>
      )}
    </StyledBingoPage>
  )
}

export default BingoPage
