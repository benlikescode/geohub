import Link from 'next/link'
import { FC } from 'react'

import { MapType } from '@types'

import { StyledMapPreviewCard } from './'

type Props = {
  map: MapType
  showEditButton?: boolean
}

const MapPreviewCard: FC<Props> = ({ map, showEditButton }) => {
  const isOfficialMap = map.creator === 'GeoHub'

  return (
    <StyledMapPreviewCard mapImage={map.previewImg} isOfficialMap={isOfficialMap}>
      <div className="mapImage"></div>

      <div className="contentWrapper">
        <div className="mapName">{map.name}</div>
        {isOfficialMap && <div className="mapDescription">{map.description}</div>}
        <div className="playWrapper">
          {showEditButton && (
            <Link href={`/create-map/${map._id}`}>
              <a className="mapEditBtn">Edit</a>
            </Link>
          )}

          <Link href={`/map/${map.slug ? map.slug : map._id}`}>
            <a className="mapPlayBtn">Play</a>
          </Link>
        </div>
      </div>
    </StyledMapPreviewCard>
  )
}

export default MapPreviewCard
