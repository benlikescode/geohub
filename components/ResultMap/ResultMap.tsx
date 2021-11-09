import { FC } from 'react'
import { StyledResultMap } from '.'
import GoogleMapReact from 'google-map-react'
import { GuessType, LocationType } from '../../types'
import { createMarker, getMapTheme, getResultMapValues } from '../../utils/helperFunctions'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/user'

type Props = {
  guessedLocations: GuessType[];
  actualLocations: LocationType[];
  round: number;
  isFinalResults?: boolean;
}

const ResultMap: FC<Props> = ({ guessedLocations, actualLocations, round, isFinalResults }) => {
  const guessedLocation = guessedLocations[guessedLocations.length - 1]
  const actualLocation = actualLocations[round -2]
  const user = useSelector(selectUser)
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
        styles: getMapTheme(''),
        clickableIcons: false
      }   
    )

    // if we are showing the final results page, load all the round markers. Otherwise, simply load the current round markers
    if (isFinalResults) {
      for (let i = 0; i < actualLocations.length; i++) {
        createMarker(guessedLocations[i], map, user.avatar)
        const marker = createMarker(actualLocations[i], map, `/images/avatars/actualMarker${i + 1}.png`)
        marker.addListener('click', () => {
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
      createMarker(guessedLocation, map, user.avatar)
      createMarker(actualLocation, map, '/images/avatars/actualMarker.png')
      
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