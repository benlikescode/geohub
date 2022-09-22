import { useRouter } from 'next/router'
/* eslint-disable @next/next/no-img-element */
import React, { FC, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import { mailman } from '@backend/utils/mailman'
import { Input } from '@components/System'
import { selectUser } from '@redux/user'
import { randomElement } from '@utils/functions/generateLocations'
import { showErrorToast } from '@utils/helperFunctions'

import { Modal } from '../Modal'
import { StyledCreateMapModal } from './'

type Props = {
  closeModal: () => void
  mapId?: string
  mapName?: string
  mapDescription?: string
  mapAvatar?: string
  updateMapDetails?: (name: string, description: string, avatar: string) => void
}

const mapAvatars = [
  'https://i.pinimg.com/736x/8a/6e/d6/8a6ed6731bedd4cf8dcb0b5b1b0c1bdb.jpg',
  'https://i.pinimg.com/originals/11/9d/35/119d35b6ee89fb63e43b39c8cd010dd1.jpg',
  'https://img.freepik.com/free-vector/city-park-with-wooden-picnic-table-benches_107791-8269.jpg?w=1380&t=st=1663618991~exp=1663619591~hmac=2e066f8b17b71cf36ceec133f12e86186338a03fec0a811d700d8a590fb1dfe4',
  'https://img.freepik.com/free-vector/log-bridge-mountains-cliff-rock-peaks-landscape-with-waterfall-trees-background-beautiful-scenery-nature-view-beam-bridgework-connect-rocky-edges-cartoon-vector-illustration_107791-4568.jpg?w=2000',
  'https://img.freepik.com/free-vector/night-forest-with-camp-fire-river-mountains_107791-6993.jpg?w=2000',
  'https://media.istockphoto.com/vectors/forest-scene-with-deciduous-trees-and-firs-around-vector-id1170129701?k=20&m=1170129701&s=612x612&w=0&h=sSmhpWYS-dxxqrVs3FajdlCtcpXRYzBXziIBtN5qTWw=',
  'https://wallpaperaccess.com/full/2707446.jpg',
  'https://static.vecteezy.com/system/resources/previews/007/817/629/original/ocean-bay-panorama-with-seashore-and-hill-view-concept-tropical-beach-vacation-cartoon-landscape-illustration-vector.jpg',
  'https://img.freepik.com/free-vector/wooden-pier-boat-river-natural-landscape_33099-1868.jpg?w=1380&t=st=1663648924~exp=1663649524~hmac=eda4a1176d8fc7fa41833ddda3bf2e76f15c2e45e7e9678c845b6b58c131c181',
  'https://img.freepik.com/free-vector/vector-illustration-mountain-landscape_1441-71.jpg?w=826&t=st=1663648959~exp=1663649559~hmac=1a04bac1ff2761af5368383bd2c02904d69cd2dbb81129deecc82c31d2374436',
  'https://img.freepik.com/free-vector/background-with-night-city-neon-lights_1441-2588.jpg?w=1380&t=st=1663648977~exp=1663649577~hmac=6af0d2fcc6b148d3499a13d2e57993bddfd7881167ae3d58f8054e910f8d88ef',
  'https://img.freepik.com/free-vector/autumn-nature-landscape-rural-dirt-road-lake_107791-13774.jpg?w=1380&t=st=1663648999~exp=1663649599~hmac=5120004e85fe37a72bddde09c6210ecacba073296a537f981956f1da7dd05d5e',
  'https://img.freepik.com/free-vector/full-moon-night-ocean-cartoon-illustration_33099-2308.jpg?w=1380&t=st=1663649026~exp=1663649626~hmac=03ba3751bb650644e8ff66dc2ee1d843d4a3108f8041bae89eb6d17f1f8503a4',
  'https://img.freepik.com/free-vector/coniferous-forest-with-black-raven-sunset_107791-13572.jpg?w=1380&t=st=1663649041~exp=1663649641~hmac=17aadd2cecaa8ef948fbd696b21a59dc385655c6509096ae9881b89466d9bd04',
  'https://img.freepik.com/free-vector/old-suburban-house-with-sign-sale_107791-6255.jpg?w=1380&t=st=1663649081~exp=1663649681~hmac=a42bdd726af0a9d074ed1843f9b6a5e5560673fbc8dfaf4ed6790292b833bd6f',
  'https://img.freepik.com/free-vector/golf-club-court-green-park-with-flags-holes-trees-hills-landscape_575670-1079.jpg?w=1480&t=st=1663649105~exp=1663649705~hmac=8d603e1791cbeda17c12959e09145f9f75ee4ef7a59b11ab01e7147d759c666b',
]

const CreateMapModal: FC<Props> = ({ closeModal, mapId, mapName, mapDescription, mapAvatar, updateMapDetails }) => {
  const user = useSelector(selectUser)
  const router = useRouter()

  const [name, setName] = useState(mapName || '')
  const [description, setDescription] = useState(mapDescription || '')
  const [avatar, setAvatar] = useState(mapAvatar || randomElement(mapAvatars))
  const [isSubmitting, setIsSubmitting] = useState(false)

  const hasMadeChanges = useMemo(
    () => name !== mapName || description !== mapDescription || avatar !== mapAvatar,
    [name, description, avatar, mapName, mapDescription, mapAvatar]
  )

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

    const { res } = await mailman(`maps/custom/${mapId}`, 'PUT', JSON.stringify(reqBody))

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
    setIsSubmitting(true)

    const reqBody = {
      name,
      description,
      avatar,
      creatorId: user.id,
    }

    const { res } = await mailman('maps/custom', 'POST', JSON.stringify(reqBody))

    setIsSubmitting(false)

    if (res.error || !res.mapId) {
      showErrorToast(res.error.message)
    }

    return router.push(`/create-map/${res.mapId}`)
  }

  return (
    <Modal
      closeModal={closeModal}
      title="Map Details"
      onActionButton={mapId ? handleEditMap : handleCreateMap}
      actionButtonText={mapId ? 'Update' : 'Next'}
      isDisabled={!name}
      isSubmitting={isSubmitting}
      maxWidth="850px"
    >
      <StyledCreateMapModal previewMapImg={avatar}>
        <div className="map-details-section">
          <Input type="text" label="Name" value={name} callback={setName} autoFocus maxLength={30} />
          <Input
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
        </div>

        <div className="map-preview-section">
          <div className="mapPreviewCard">
            <div className="mapImage"></div>

            <div className="contentWrapper">
              <div className="mapName">{name || 'Map Name'}</div>
              <div className="playWrapper">
                <div className="mapPlayBtn">Play</div>
              </div>
            </div>
          </div>
        </div>
      </StyledCreateMapModal>
    </Modal>
  )
}

export default CreateMapModal
