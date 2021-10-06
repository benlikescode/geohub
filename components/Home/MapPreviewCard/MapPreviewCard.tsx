import { HeartIcon, LocationMarkerIcon, UserIcon } from '@heroicons/react/outline'
import { FC } from 'react'
import { StyledMapPreviewCard } from '.'
import { MapType } from '../../../types'
import { Button, Icon } from '../../System'

type Props = {
  map: MapType
}

const MapPreviewCard: FC<Props> = ({ map }) => {

  const handlePlayClick = () => {
    
  }

  return (
    <StyledMapPreviewCard>
      <div className="mapImage">
        <img src={map.previewImg} alt="" />
      </div>

      <div className="contentWrapper">
        <div className="mapName">{map.name}</div>
        <div className="mapDescription">{map.description}</div>
        <Button type="solidBlue" width="45%" callback={handlePlayClick} isRound>Play</Button>
      </div>
     
      <div className="statsFooter">
        <div className="statItem">
          <Icon size={24}>
            <UserIcon />
          </Icon>
          <span>{map.usersPlayed}</span>
        </div>

        <div className="statItem">
          <Icon size={24}>
            <LocationMarkerIcon />
          </Icon>
          <span>{map.locations.length}</span>
        </div>

        <div className="statItem">
          <Icon size={24}>
            <HeartIcon />
          </Icon>
          <span>{map.likes}</span>
        </div>    
      </div>
    </StyledMapPreviewCard>
  )
}

export default MapPreviewCard
