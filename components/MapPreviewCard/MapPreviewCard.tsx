import { FC } from 'react'
import { StyledMapPreviewCard } from '.'
import { MapType } from '@types'
import Link from 'next/link'

type Props = {
  map: MapType
}

const MapPreviewCard: FC<Props> = ({ map }) => {
  return (
    <StyledMapPreviewCard mapImage={map.previewImg}>
      <div className="mapImage"></div>

      <div className="contentWrapper">
        <div className="mapName">{map.name}</div>
        <div className="mapDescription">{map.description}</div>
        <div className="playWrapper">
          <Link href={`/map/${map.slug ? map.slug : map.id}`}>
            <a className="mapPlayBtn">Play</a>
          </Link>
        </div>
      </div>
    </StyledMapPreviewCard>
  )
}

export default MapPreviewCard
