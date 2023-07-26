import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import { MapPreviewCard } from '@components/MapPreviewCard'
import { Input, ToggleSwitch } from '@components/system'
import { MapType } from '@types'
import { MAP_AVATAR_PATH } from '@utils/constants/random'
import { mailman, randomInt, showErrorToast } from '@utils/helpers'
import { MainModal } from '../'
import { StyledCreateMapModal } from './'

type Props = {
  isOpen: boolean
  closeModal: () => void
  mapDetails?: MapType
  setMapDetails?: (mapDetails: MapType) => void
}

const mapAvatars = Array.from({ length: 16 }).map((_, idx) => `custom${idx + 1}.jpg`)

const CreateMapModal: FC<Props> = ({ isOpen, closeModal, mapDetails, setMapDetails }) => {
  const router = useRouter()

  const [name, setName] = useState(mapDetails?.name || '')
  const [description, setDescription] = useState(mapDetails?.description || '')
  const [avatar, setAvatar] = useState(mapDetails?.previewImg || `custom${randomInt(1, 17)}.jpg`)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const orginalMapDetails = useRef(mapDetails)

  const isEditMode = !!mapDetails

  const hasMadeChanges = () => {
    const original = orginalMapDetails.current as MapType

    return name !== original.name || description !== original.description || avatar !== original.previewImg
  }

  const handleEditMap = async () => {
    if (!hasMadeChanges) {
      return closeModal()
    }

    setIsSubmitting(true)

    const reqBody = {
      name,
      description,
      previewImg: avatar,
    }

    const res = await mailman(`maps/custom/${mapDetails?._id}`, 'PUT', JSON.stringify(reqBody))

    setIsSubmitting(false)

    if (res.error) {
      showErrorToast(res.error.message)
    }

    setMapDetails && setMapDetails({ ...(mapDetails as MapType), name, description, previewImg: avatar })

    closeModal()
  }

  const handleCreateMap = async () => {
    if (!name) {
      return showErrorToast('Name is required', { id: 'CreateMapModal1' })
    }

    setIsSubmitting(true)

    const reqBody = {
      name,
      description,
      avatar,
    }

    const res = await mailman('maps/custom', 'POST', JSON.stringify(reqBody))

    setIsSubmitting(false)

    if (res.error || !res.mapId) {
      showErrorToast(res.error.message)
    }

    return router.push(`/create-map/${res.mapId}`)
  }

  return (
    <MainModal
      isOpen={isOpen}
      onClose={closeModal}
      title="Map Details"
      onAction={isEditMode ? handleEditMap : handleCreateMap}
      actionButtonText={isEditMode ? 'Update' : 'Next'}
      isSubmitting={isSubmitting}
      maxWidth="768px"
    >
      <StyledCreateMapModal>
        <div className="map-details-section">
          <Input id="name" type="text" label="Name" value={name} callback={setName} autoFocus maxLength={30} />
          <Input
            id="description"
            type="text"
            label="Description (optional)"
            isTextarea
            maxLength={60}
            value={description}
            callback={setDescription}
          />
          <div className="avatar-selection">
            <h2 className="section-title">Avatar</h2>

            <div className="avatars">
              {mapAvatars.map((mapAvatar, idx) => (
                <div
                  key={idx}
                  className={`avatar-item ${avatar === mapAvatar ? 'selected' : ''}`}
                  onClick={() => setAvatar(mapAvatar)}
                >
                  <Image
                    src={`${MAP_AVATAR_PATH}/${mapAvatar}`}
                    alt={`Map Avatar Option ${idx + 1}`}
                    layout="fill"
                    objectFit="cover"
                    sizes="200px"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="visibility-selection">
            <div className="cool">
              <div className="happy">Publish Map</div>
              <p>Make your map visible to others</p>
            </div>
            <ToggleSwitch isActive={true} setIsActive={() => console.log('yo')} />
          </div>
        </div>

        <div className="map-preview-section">
          <MapPreviewCard
            map={{ _id: mapDetails?._id, name: name || 'Map Name' || '', previewImg: avatar || '', description }}
            isForDisplayOnly
          />
        </div>
      </StyledCreateMapModal>
    </MainModal>
  )
}

export default CreateMapModal
