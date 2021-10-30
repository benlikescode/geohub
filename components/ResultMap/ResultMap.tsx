import { FC } from 'react'
import { StyledResultMap } from '.'
import GoogleMapReact from 'google-map-react'
import { GuessType, LocationType } from '../../types'
import { getMapTheme, getResultMapValues } from '../../utils/helperFunctions'

type Props = {
  guessedLocations: GuessType[];
  actualLocations: LocationType[];
  round: number;
  isFinalResults?: boolean;
}

const ResultMap: FC<Props> = ({ guessedLocations, actualLocations, round, isFinalResults }) => {
  const guessedLocation = guessedLocations[guessedLocations.length - 1]
  const actualLocation = actualLocations[round -2]
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
    key: googleKey
  }

  const handleApiLoaded = () => {
    const { center, zoom } = getResultMapValues(guessedLocation, actualLocation, isFinalResults)
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
      createMarker(guessedLocation, map, 'https://www.geoguessr.com/images/auto/30/30/ce/0/plain/pin/c2fe16562d9ad321687532d53b067e75.png')
      const marker = createMarker(actualLocation, map, '')
      

      new google.maps.Polyline({
        path: [guessedLocation, actualLocation],
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
          center={deafultCoords} 
          zoom={2}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={handleApiLoaded}
        >
        </GoogleMapReact>
      </div>   
    </StyledResultMap>
  )
}

export default ResultMap
