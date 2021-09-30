import { FC } from 'react'
import { useSelector } from 'react-redux'
import { StyledStreetViewControls } from '.'
import { selectGame } from '../../redux/game'

type Props = {
  compassHeading: number
}

const StreetViewControls: FC<Props> = ({ compassHeading }) => {

  return (
    <StyledStreetViewControls rotation={compassHeading}>
      <div className="compass">
        <img src="/images/compass.svg" alt="" />
      </div>
    </StyledStreetViewControls>
  )
}

export default StreetViewControls
