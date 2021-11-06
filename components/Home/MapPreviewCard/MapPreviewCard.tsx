import { HeartIcon, LocationMarkerIcon, UserIcon } from '@heroicons/react/outline'
import { FC } from 'react'
import { StyledMapPreviewCard } from '.'
import { MapType } from '../../../types'
import { Button, Icon } from '../../System'
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
        <Link href={`/map/${map.slug ? map.slug : map.id}`}>
          <a>
            <Button type="solidPurple" width="180px">Play</Button>
          </a>     
        </Link>
      </div>
     
      
    </StyledMapPreviewCard>
  )
}

export default MapPreviewCard
