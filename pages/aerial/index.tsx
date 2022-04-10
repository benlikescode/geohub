import React, { createRef, FC, useEffect, useState } from 'react'
import StyledAerialPage from '../../styles/AerialPage.Styled'
import mapboxgl from 'mapbox-gl'
import { mailman } from '../../backend/utils/mailman'

const AerialPage: FC = () => {
  mapboxgl.accessToken = 'pk.eyJ1IjoiYmVubGlrZXNjb2RlIiwiYSI6ImNsMXFxbXAwYjFxNjMzZW1tazQ5N21jZTgifQ.bt9S5fzwugjjnZT0eR_wnQ'
  const mapContainer = createRef<HTMLDivElement>()
  const map = createRef<HTMLDivElement>()
  const MIN_ZOOM = 15
  const [lat, setLat] = useState(37.5600)
  const [lng, setLng] = useState(126.9900)
  const [zoom, setZoom] = useState(15)

  const fetchGame = async () => {
    const { status, res } = await mailman(`aerial`)

  }

  useEffect(() => {
    if (map.current) return
    new mapboxgl.Map({
      container: mapContainer.current as HTMLElement,
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: [lng, lat],
      zoom: zoom,
      minZoom: MIN_ZOOM,
    })
  })

  return (
    <StyledAerialPage>
      <div className="mapContainer" ref={mapContainer}></div>
    </StyledAerialPage> 
  )
}

export default AerialPage