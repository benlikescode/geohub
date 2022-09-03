import GoogleMapReact from 'google-map-react'
import React, { FC } from 'react'

import { StyledStreetviewLayerMap } from './'

const StreetviewLayerMap: FC = () => {

  const googleKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string

  const GoogleMapConfig = {
    key: googleKey
  }

  const handleApiLoaded = () => {
    const map = new window.google.maps.Map(
      document.getElementById('map') as HTMLElement, {
        zoom: 2,
        center: { lat: 0, lng: 0 },
      }
    )

    const svLayer = new window.google.maps.StreetViewCoverageLayer()
    svLayer.setMap(map)

    
    
  }

  return (
    <StyledStreetviewLayerMap>
      <div id="map"></div>
      <GoogleMapReact 
        bootstrapURLKeys={GoogleMapConfig}
        center={{lat: 0, lng: 0}} 
        zoom={11}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded()}
      >
      </GoogleMapReact>
    </StyledStreetviewLayerMap>
  )
}

export default StreetviewLayerMap
