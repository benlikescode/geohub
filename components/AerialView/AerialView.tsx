import mapboxgl from 'mapbox-gl'
import React, { FC } from 'react'

import { StyledAerialView } from './'

type Props = {
  
}

const AerialView: FC<Props> = ({}) => {

  mapboxgl.accessToken = 'eyJ1IjoiYmVubGlrZXNjb2RlIiwiYSI6ImNsMXFxbXAwYjFxNjMzZW1tazQ5N21jZTgifQ.bt9S5fzwugjjnZT0eR_wnQ'
    var map = new mapboxgl.Map({
    container: 'mapbox',
    style: 'mapbox://styles/mapbox/streets-v11'
    })
  return (
    <StyledAerialView>
      <div id="mapbox"></div>
    </StyledAerialView>
  )
}

export default AerialView