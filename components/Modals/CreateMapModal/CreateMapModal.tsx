import Image from 'next/image'
import { useRouter } from 'next/router'
/* eslint-disable @next/next/no-img-element */
import React, { FC, useEffect, useMemo, useState } from 'react'
import { mailman } from '@backend/utils/mailman'
import { Input } from '@components/System'
import { useAppSelector } from '@redux/hook'
import { randomInt } from '@utils/functions/generateLocations'
import { showErrorToast } from '@utils/helpers/showToasts'
import { MainModal } from '../'
import { MAP_AVATAR_BASE_PATH } from '../../../utils/constants/random'
import { MapPreviewCard } from '../../MapPreviewCard'
import { StyledCreateMapModal } from './'

type Props = {
  isOpen: boolean
  closeModal: () => void
  mapId?: string
  mapName?: string
  mapDescription?: string
  mapAvatar?: string
  updateMapDetails?: (name: string, description: string, avatar: string) => void
}

const mapAvatars = Array.from({ length: 16 }).map((_, idx) => `custom${idx + 1}.jpg`)

const CreateMapModal: FC<Props> = ({
  isOpen,
  closeModal,
  mapId,
  mapName,
  mapDescription,
  mapAvatar,
  updateMapDetails,
}) => {
  const user = useAppSelector((state) => state.user)
  const router = useRouter()

  const [name, setName] = useState(mapName || '')
  const [description, setDescription] = useState(mapDescription || '')
  const [avatar, setAvatar] = useState(mapAvatar || `custom${randomInt(1, 17)}.jpg`)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const hasMadeChanges = useMemo(
    () => name !== mapName || description !== mapDescription || avatar !== mapAvatar,
    [name, description, avatar, mapName, mapDescription, mapAvatar]
  )

  // Future Improvement: Store map details in a redux slice
  useEffect(() => {
    setName(mapName || '')
    setDescription(mapDescription || '')
    setAvatar(mapAvatar || '')
  }, [mapName, mapDescription, mapAvatar])

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

    const res = await mailman(`maps/custom/${mapId}`, 'PUT', JSON.stringify(reqBody))

    setIsSubmitting(false)

    if (res.error) {
      showErrorToast(res.error.message)
    }

    if (updateMapDetails) {
      updateMapDetails(name, description, avatar)
      closeModal()
    }
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
      creatorId: user.id,
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
      onAction={updateMapDetails ? handleEditMap : handleCreateMap}
      actionButtonText={updateMapDetails ? 'Update' : 'Next'}
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
                    src={MAP_AVATAR_BASE_PATH + mapAvatar}
                    alt={`Map Avatar Option ${idx + 1}`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="map-preview-section">
          <MapPreviewCard
            map={{ _id: mapId, name: name || 'Map Name' || '', previewImg: avatar || '', description: mapDescription }}
            isForDisplayOnly
          />
        </div>
      </StyledCreateMapModal>
    </MainModal>
  )
}

export default CreateMapModal
