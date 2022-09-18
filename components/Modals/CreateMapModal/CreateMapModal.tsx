import { useRouter } from 'next/router'
/* eslint-disable @next/next/no-img-element */
import React, { FC, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { mailman } from '@backend/utils/mailman'
import { Input } from '@components/System'
import { ToggleSwitch } from '@components/System/ToggleSwitch'
import { CheckIcon } from '@heroicons/react/outline'
import { selectUser } from '@redux/user'
import { BACKGROUND_COLORS, EMOJIS } from '@utils/constants/avatarOptions'

import { Modal } from '../Modal'
import { StyledCreateMapModal } from './'

type Props = {
  closeModal: () => void
}

const mapAvatars = [
  'https://i.pinimg.com/736x/8a/6e/d6/8a6ed6731bedd4cf8dcb0b5b1b0c1bdb.jpg',
  'https://i.pinimg.com/originals/11/9d/35/119d35b6ee89fb63e43b39c8cd010dd1.jpg',
  'https://img.freepik.com/premium-vector/illustration-mountain-sky-color-bright_46176-265.jpg?w=2000',
  'https://img.freepik.com/free-vector/log-bridge-mountains-cliff-rock-peaks-landscape-with-waterfall-trees-background-beautiful-scenery-nature-view-beam-bridgework-connect-rocky-edges-cartoon-vector-illustration_107791-4568.jpg?w=2000',
  'https://img.freepik.com/free-vector/night-forest-with-camp-fire-river-mountains_107791-6993.jpg?w=2000',
  'https://media.istockphoto.com/vectors/forest-scene-with-deciduous-trees-and-firs-around-vector-id1170129701?k=20&m=1170129701&s=612x612&w=0&h=sSmhpWYS-dxxqrVs3FajdlCtcpXRYzBXziIBtN5qTWw=',
  'https://wallpaperaccess.com/full/2707446.jpg',
  'https://static.vecteezy.com/system/resources/previews/002/520/384/non_2x/cartoon-illustration-of-the-countryside-landscape-the-road-leading-to-the-valley-at-sunset-with-mountain-and-sky-in-background-free-vector.jpg',
]

const CreateMapModal: FC<Props> = ({ closeModal }) => {
  const user = useSelector(selectUser)
  const router = useRouter()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [avatar, setAvatar] = useState('')
  const [isPublic, setIsPublic] = useState(false)

  const handleActionButton = async () => {
    return router.push('/create-map')
    /*
    if (showSkipButton) {
      return router.push('/create-map')
    }

    const reqBody = {
      name,
      description,
      avatar,
      isPublic,
    }

    const { status, res } = await mailman('maps/custom', 'POST', JSON.stringify(reqBody))
    */
  }

  return (
    <Modal
      closeModal={closeModal}
      title="Map Details"
      onActionButton={handleActionButton}
      actionButtonText="Next"
      isDisabled={!name}
    >
      <StyledCreateMapModal>
        <Input type="text" label="Name" callback={setName} />
        <Input type="text" label="Description" isTextarea maxLength={60} callback={setDescription} />

        <div className="avatar-selection">
          <h2 className="section-title">Avatar</h2>

          <div className="avatars">
            {mapAvatars.map((map, idx) => (
              <div
                key={idx}
                className={`avatar-item ${avatar === map ? 'selected' : ''}`}
                onClick={() => setAvatar(map)}
              >
                <img src={map} alt="" />
              </div>
            ))}
          </div>
        </div>

        <div className="visibility-selection">
          <div>
            <h2 className="section-title">Make Public</h2>
            <span className="visibility-warning">Other users will be able to view and play this map</span>
          </div>
          <ToggleSwitch isActive={isPublic} setIsActive={setIsPublic} />
        </div>
      </StyledCreateMapModal>
    </Modal>
  )
}

export default CreateMapModal
