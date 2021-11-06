import { HeartIcon, LocationMarkerIcon, ScaleIcon, UserIcon } from '@heroicons/react/outline'
import { FC, useEffect, useState } from 'react'
import { StyledMapStats } from '.'
import { MapType } from '../../types'
import { FlexGroup, Icon } from '../System'

type Props = {
  map: MapType
}

const MapStats: FC<Props> = ({ map }) => {

  return (
    <StyledMapStats>
      <FlexGroup>
        <Icon size={30} fill="var(--lightPurple)">
          <ScaleIcon />
        </Icon>
        <div className="textWrapper">
          <span className="mainLabel">Medium</span>
          <span className="subLabel">Avg. Score {map.avgScore}</span>
        </div>
      </FlexGroup>

      <FlexGroup>
        <Icon size={30} fill="var(--lightPurple)">
          <UserIcon />
        </Icon>
        <div className="textWrapper">
          <span className="mainLabel">Explorers</span>
          <span className="subLabel">{map.usersPlayed}</span>
        </div>
      </FlexGroup>

      <FlexGroup>
        <Icon size={30} fill="var(--lightPurple)">
          <LocationMarkerIcon />
        </Icon>
        <div className="textWrapper">
          <span className="mainLabel">Locations</span>
          <span className="subLabel">
            {map.locationCount}
          </span>
        </div>
      </FlexGroup>

      <FlexGroup>
        <Icon size={30} fill="var(--lightPurple)">
          <HeartIcon />
        </Icon>
        <div className="textWrapper">
          <span className="mainLabel">Likes</span>
          <span className="subLabel">{map.likes}</span>
        </div>
      </FlexGroup>
       
      
    </StyledMapStats>
  )
}

export default MapStats
