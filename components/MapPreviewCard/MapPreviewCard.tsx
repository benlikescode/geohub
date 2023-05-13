import Image from 'next/image'
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React, { FC } from 'react'

import { TrashIcon } from '@heroicons/react/outline'
import { MapType } from '@types'

import { MAP_AVATAR_BASE_PATH } from '../../utils/constants/random'
import { StyledMapPreviewCard } from './'

type Props = {
  map: Pick<MapType, '_id' | 'name' | 'description' | 'previewImg'>
  showDescription?: boolean
  type?: 'large' | 'small'
  openDeleteModal?: () => void
  isForDisplayOnly?: boolean
}

const MapPreviewCard: FC<Props> = ({ map, showDescription, type = 'large', openDeleteModal, isForDisplayOnly }) => {
  return (
    <StyledMapPreviewCard isForDisplayOnly={isForDisplayOnly}>
      {type === 'large' && (
        <div className="large-card-wrapper">
          {/* <div className="mapImage"></div> */}
          <div className="map-avatar">
            <Image src={`/images/mapAvatars/${map.previewImg}`} layout="fill" objectFit="cover" alt="" />
            <div className="image-gradient"></div>
          </div>
          <div className="contentWrapper">
            <div className="mapName">{map.name}</div>
            {showDescription && <div className="mapDescription">{map.description}</div>}
            <div className="playWrapper">
              {!isForDisplayOnly ? (
                <Link href={`/map/${map._id}`}>
                  <a className="mapPlayBtn">Play</a>
                </Link>
              ) : (
                <div className="mapPlayBtn">Play</div>
              )}
            </div>
          </div>
        </div>
      )}

      {type === 'small' && (
        <div className="small-card-wrapper">
          <div className="preview-image">
            <Image src={MAP_AVATAR_BASE_PATH + map.previewImg} alt="" layout="fill" objectFit="cover" />
            <div className="mapName">{map.name}</div>
          </div>

          <div className="playWrapper">
            <Link href={`/create-map/${map._id}`}>
              <a className="mapPlayBtn">Customize</a>
            </Link>
            <Link href={`/map/${map._id}`}>
              <a className="mapEditBtn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path
                    fillRule="evenodd"
                    d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </Link>
            <button className="mapDeleteBtn" onClick={openDeleteModal}>
              <TrashIcon />
            </button>
          </div>
        </div>
      )}
    </StyledMapPreviewCard>
  )
}

export default MapPreviewCard
