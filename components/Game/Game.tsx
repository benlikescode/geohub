import { FC } from 'react'
import { StyledGame } from '.'
import { Map } from '../../components/Map'
import { StreetView } from '../StreetView'

const Game: FC = () => {

  const coord = {
    lat: 29.8746706,
    lng: -95.8390693
  }

  return (
    <StyledGame>
      <StreetView coordinate={coord} zoom={11} />      
      <Map coordinate={coord} zoom={8} />
      
    </StyledGame>
  )
}

export default Game
