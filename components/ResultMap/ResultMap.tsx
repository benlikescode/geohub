import { FC, useEffect, useRef, useState } from 'react'
import { StyledResultMap } from '.'
import GoogleMapReact from 'google-map-react'
import { LocationType } from '../../types'
import { getMapTheme, getResultMapValues } from '../../utils/helperFunctions'

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
    const { center, zoom } = getResultMapValues(guessedLocations, actualLocations)
    const map = new window.google.maps.Map(
      document.getElementById("resultMap") as HTMLElement, {
        zoom: zoom,
        center: center,
        disableDefaultUI: true,
        styles: getMapTheme('')
      }   
    )

    for (const location of guessedLocations) {
      createMarker(location, map, 'https://www.geoguessr.com/images/auto/30/30/ce/0/plain/pin/c2fe16562d9ad321687532d53b067e75.png')
    }

    for (let i = 0; i < actualLocations.length; i++) {
      // if we are generating just the round marker
      if (actualLocations.length === 1) {
        const marker = createMarker(actualLocations[i], map, '')
        marker.addListener("click", () => {
          window.open(`http://www.google.com/maps?layer=c&cbll=${actualLocations[i].lat},${actualLocations[i].lng}`, '_blank')   
        })
      }
      // if we are generating all the round markers => we want to generate the numbered markers
      else {
        const marker = createMarker(actualLocations[i], map, `/images/finalMarker${i + 1}.png`)
        marker.addListener("click", () => {
          window.open(`http://www.google.com/maps?layer=c&cbll=${actualLocations[i].lat},${actualLocations[i].lng}`, '_blank')   
        })
      }
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
