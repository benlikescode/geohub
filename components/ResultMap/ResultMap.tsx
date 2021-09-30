import { FC, useEffect, useRef, useState } from 'react'
import { StyledResultMap } from '.'
import GoogleMapReact from 'google-map-react'
import { LocationType } from '../../types'
import { getMapTheme } from '../../utils/helperFunctions'

type Props = {
  guessedLocations: LocationType[]
  actualLocations: LocationType[]
}

const ResultMap: FC<Props> = ({ guessedLocations, actualLocations }) => {
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
        styles: getMapTheme('')
      }   
    )

    for (const location of guessedLocations) {
      createMarker(location, map, 'https://www.geoguessr.com/images/auto/30/30/ce/0/plain/pin/5683bfb6646c1a1089483512d66e70d5.png')
    }

    for (const location of actualLocations) {
      const marker = createMarker(location, map, '')
      marker.addListener("click", () => {
        window.open(`http://www.google.com/maps?layer=c&cbll=${location.lat},${location.lng}`, '_blank')   
      })
    } 

    const lineSymbol = {
      path: "M 0,-1 0,1",
      strokeOpacity: 1,
      scale: 2,
    }

    for (let i = 0; i < actualLocations.length; i++) {
      new google.maps.Polyline({
        path: [guessedLocations[i], actualLocations[i]],
        map: map,
        strokeOpacity: 0,
        icons: [
          {
            icon: lineSymbol,
            offset: "0",
            repeat: "10px",
          },
        ],    
      })
    }

    
  }

  const createMarker = (position: LocationType, map: google.maps.Map, markerImage: string) => {
    if (markerImage) {
      const image = {
        url: markerImage,
      }
  
      return new window.google.maps.Marker({
        position: position,
        map: map,
        icon: image
      })
    }

    return new window.google.maps.Marker({
      position: position,
      map: map,
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
