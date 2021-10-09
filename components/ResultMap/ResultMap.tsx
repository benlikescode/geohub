import { FC, useEffect, useRef, useState } from 'react'
import { StyledResultMap } from '.'
import GoogleMapReact from 'google-map-react'
import { LocationType } from '../../types'
import { getMapTheme, getResultMapValues } from '../../utils/helperFunctions'
import { selectGame } from '../../redux/game'
import { useSelector } from 'react-redux'

type Props = {
  guessedLocations: LocationType[]
  actualLocations: LocationType[]
  isFinalResults?: boolean
}

const ResultMap: FC<Props> = ({ guessedLocations, actualLocations, isFinalResults }) => {
  const game = useSelector(selectGame)
  const deafultCoords = {
    lat: 0, 
    lng: 0
  }

  const lineSymbol = {
    path: "M 0,-1 0,1",
    strokeOpacity: 1,
    scale: 2,
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

    // if we are showing the final results page, load all the round markers. Otherwise, simply load the current round markers
    if (isFinalResults) {
      for (let i = 0; i < actualLocations.length; i++) {
        createMarker(guessedLocations[i], map, 'https://www.geoguessr.com/images/auto/30/30/ce/0/plain/pin/c2fe16562d9ad321687532d53b067e75.png')
        const marker = createMarker(actualLocations[i], map, `/images/finalMarker${i + 1}.png`)
        marker.addListener("click", () => {
          window.open(`http://www.google.com/maps?layer=c&cbll=${actualLocations[i].lat},${actualLocations[i].lng}`, '_blank')   
        })

        // generating the lines between guessed and actual markers
        new google.maps.Polyline({
          path: [guessedLocations[i], actualLocations[i]],
          map: map,
          strokeOpacity: 0,
          icons: [
            {icon: lineSymbol, offset: "0", repeat: "10px"},
          ],    
        })
      }
    }
    else {
      const roundIdx = game.round - 1
      createMarker(guessedLocations[roundIdx], map, 'https://www.geoguessr.com/images/auto/30/30/ce/0/plain/pin/c2fe16562d9ad321687532d53b067e75.png')
      const marker = createMarker(actualLocations[roundIdx], map, '')
      marker.addListener("click", () => {
        window.open(`http://www.google.com/maps?layer=c&cbll=${actualLocations[roundIdx].lat},${actualLocations[roundIdx].lng}`, '_blank')   
      })

      new google.maps.Polyline({
        path: [guessedLocations[roundIdx], actualLocations[roundIdx]],
        map: map,
        strokeOpacity: 0,
        icons: [
          {icon: lineSymbol, offset: "0", repeat: "10px"},
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
