import { HeartIcon, LocationMarkerIcon, ScaleIcon, UserIcon } from '@heroicons/react/outline'
import { FC, useEffect, useState } from 'react'
import { StyledMapStats } from '.'
import { MapType } from '../../types'
import { FlexGroup, Icon } from '../System'

type Props = {
  map: MapType
}

const MapStats: FC<Props> = ({ map }) => {
  const [difficulty, setDifficulty] = useState({label: 'Medium', color: 'var(--lightYellow)'})

  const calculateDifficulty = () => {
    if (map.avgScore) {
      if (map.avgScore < 10000) {
        setDifficulty({label: 'Hard', color: 'var(--lightRed)'})
      }
      else if (map.avgScore < 15000) {
        setDifficulty({label: 'Medium', color: 'var(--lightYellow)'})
      }
      else {
        setDifficulty({label: 'Easy', color: 'var(--lightGreen)'})
      }
    }   
  }

  useEffect(() => {
    calculateDifficulty()
  }, [])

  return (
    <StyledMapStats>
      <FlexGroup>
        <Icon size={40} fill={difficulty.color}>
          <ScaleIcon />
        </Icon>
        <div className="textWrapper">
          <span className="mainLabel">{difficulty.label}</span>
          <span className="subLabel">Avg. Score {map.avgScore}</span>
        </div>
      </FlexGroup>

      <FlexGroup>
        <Icon size={40}>
          <UserIcon />
        </Icon>
        <div className="textWrapper">
          <span className="mainLabel">Explorers</span>
          <span className="subLabel">{map.usersPlayed}</span>
        </div>
      </FlexGroup>

      <FlexGroup>
        <Icon size={40}>
          <LocationMarkerIcon />
        </Icon>
        <div className="textWrapper">
          <span className="mainLabel">Locations</span>
          <span className="subLabel">{map.locations.length}</span>
        </div>
      </FlexGroup>

      <FlexGroup>
        <Icon size={40}>
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
