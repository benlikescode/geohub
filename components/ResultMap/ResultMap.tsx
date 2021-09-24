import { FC, useEffect, useRef, useState } from 'react'
import { StyledResultMap } from '.'
import GoogleMapReact from 'google-map-react'
import { CoordinateType } from '../../types'

type Props = {
  locations: CoordinateType[]
}

const ResultMap: FC<Props> = ({ locations }) => {
  const deafultCoords = {
    lat: 0, 
    lng: 0
  }
 
  const googleKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string

  const GoogleMapConfig = {
    key: googleKey,
    libraries: 'places'
  }

  const handleApiLoaded = () => {
    const map = new window.google.maps.Map(
      document.getElementById("resultMap") as HTMLElement, {
        zoom: 2,
        center: deafultCoords,
        disableDefaultUI: true,
      }   
    )

    for (const location of locations) {
      createMarker(location, map)
    }
  }

  const createMarker = (position: CoordinateType, map: google.maps.Map) => {
    const image = {
      url: "https://www.geoguessr.com/images/auto/30/30/ce/0/plain/pin/5683bfb6646c1a1089483512d66e70d5.png",
      size: new google.maps.Size(30, 30),
    }

    return new window.google.maps.Marker({
      position: position,
      map: map,
      icon: image 
    })
  }

  return (
    <StyledResultMap>
      <div id="resultMap" className="map">
        <GoogleMapReact 
          bootstrapURLKeys={GoogleMapConfig}
          defaultCenter={deafultCoords} 
          defaultZoom={2}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={handleApiLoaded}
        >
        </GoogleMapReact>
        <div className="controls">Controls</div>
      </div>   
    </StyledResultMap>
  )
}

export default ResultMap
