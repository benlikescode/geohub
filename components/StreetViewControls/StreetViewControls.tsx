import { FlagIcon, LocationMarkerIcon } from '@heroicons/react/outline'
import { FC } from 'react'
import { useSelector } from 'react-redux'
import { StyledStreetViewControls } from '.'
import { selectGame } from '../../redux/game'
import { Button, Icon } from '../System'

type Props = {
  compassHeading: number
}

const StreetViewControls: FC<Props> = ({ compassHeading }) => {

  return (
    <StyledStreetViewControls rotation={compassHeading}>
      <div className="compass">
        <img src="/images/compass.svg" alt="" />
      </div>

      <Button type="iconRounded">
        <Icon size={24} fill="#fff">
          <LocationMarkerIcon />
        </Icon>
      </Button>
      
      <Button type="iconRounded">
        <Icon size={24} fill="#fff">
          <FlagIcon />
        </Icon>
      </Button>
     
    </StyledStreetViewControls>
  )
}

export default StreetViewControls
