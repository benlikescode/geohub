import { FC, useEffect, useRef, useState } from 'react'
import { StyledMap } from '.'
import GoogleMapReact from 'google-map-react'
import { LocationType } from '../../types'
import Marker from 'google-map-react'
import { Button } from '../System/Button'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { addGuess, selectGame, updateGuess, updateView } from '../../redux/game'
import { getMapTheme } from '../../utils/helperFunctions'

type Props = {
  coordinate: LocationType
  zoom: number
}

const Map: FC<Props> = ({ coordinate, zoom }) => {
  const [map, setMap] = useState<google.maps.Map>()
  const [marker, setMarker] = useState<google.maps.Marker>()
  const [mapHeight, setMapHeight] = useState(200)
  const [mapWidth, setMapWidth] = useState(400)
  const [hasGuessed, setHasGuessed] = useState(false)
  const prevMarkersRef = useRef<google.maps.Marker[]>([])
  const router = useRouter()
  const dispatch = useDispatch()
  const game = useSelector(selectGame)


  const googleKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string

  const GoogleMapConfig = {
    key: googleKey,
    libraries: 'places'
  }

  const handleApiLoaded = () => {
    const map = new window.google.maps.Map(
      document.getElementById("guessMap") as HTMLElement, {
        zoom: 2,
        center: { lat: 0, lng: 0 },
        disableDefaultUI: true,
        styles: getMapTheme('Light')
      }   
    )

    clearMarkers(prevMarkersRef.current)

    window.google.maps.event.addListener(map, "click", (e: any) => {
      const location = {
        lat: e.latLng.lat(), 
        lng: e.latLng.lng()
      }
      dispatch(updateGuess({
        currGuess: location
      }))

      const marker = createMarker(location, map)
      clearMarkers(prevMarkersRef.current)
      prevMarkersRef.current.push(marker)
    });
  }

  const createMarker = (position: LocationType, map: google.maps.Map) => {
    const image = {
      url: "https://www.geoguessr.com/images/auto/30/30/ce/0/plain/pin/5683bfb6646c1a1089483512d66e70d5.png",
      size: new google.maps.Size(30, 30),
    }

    setHasGuessed(true)

    return new window.google.maps.Marker({
      position: position,
      map: map,
      icon: image 
    })

  }

  const clearMarkers = (markers: google.maps.Marker[]) => {
    for (let m of markers) {
      m.setMap(null)
    }
  }

  const handleMapHover = () => {
    setMapHeight(400)
    setMapWidth(600)
  }

  const handleMapLeave = () => {
    setMapHeight(200)
    setMapWidth(400)
  }

  const handleSubmitGuess = () => {
    const guesses: LocationType[] = game.guessedLocations
    console.log(guesses)

    dispatch(updateView({
      currView: 'Result'
    }))
    dispatch(addGuess({
      guessedLocations: game.currGuess
    }))
  }

  return (
    <StyledMap mapHeight={mapHeight} mapWidth={mapWidth}>
      <div className="guessMapWrapper" onMouseOver={handleMapHover} onMouseLeave={handleMapLeave}>
        <div id="guessMap" className="map">
          <GoogleMapReact 
            bootstrapURLKeys={GoogleMapConfig}
            defaultCenter={coordinate} 
            defaultZoom={zoom}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={handleApiLoaded}
          >
          </GoogleMapReact>
          <div className="controls">Controls</div>
        </div>   
        <Button 
        type="solidBlue" 
        width="100%" 
        isDisabled={!hasGuessed}
        callback={handleSubmitGuess}
        >Submit Guess</Button> 
      </div>  
    </StyledMap>
  )
}

export default Map
