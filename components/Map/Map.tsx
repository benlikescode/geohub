import { FC, useEffect, useRef, useState } from 'react'
import { StyledMap } from '.'
import GoogleMapReact from 'google-map-react'
import { CoordinateType } from '../../types'
import Marker from 'google-map-react'
import { Button } from '../System/Button'
import { useRouter } from 'next/router'

type Props = {
  coordinate: CoordinateType
  zoom: number
}

const Map: FC<Props> = ({ coordinate, zoom }) => {
  const [map, setMap] = useState<google.maps.Map>()
  const [marker, setMarker] = useState<google.maps.Marker>()
  const [hasGuessed, setHasGuessed] = useState(false)
  const prevMarkersRef = useRef<google.maps.Marker[]>([])
  const router = useRouter()


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
      }   
    )

    clearMarkers(prevMarkersRef.current)

    window.google.maps.event.addListener(map, "click", (e: any) => {
      const marker = createMarker({ lat: e.latLng.lat(), lng: e.latLng.lng() }, map)
      clearMarkers(prevMarkersRef.current)
      prevMarkersRef.current.push(marker)
    });
  }

  const createMarker = (position: CoordinateType, map: google.maps.Map) => {
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

  const handleSubmitGuess = () => {
    router.push('/result/1')
  }

  return (
    <StyledMap>
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
      type="solidGreen" 
      width="100%" 
      isDisabled={!hasGuessed}
      callback={handleSubmitGuess}
      >Submit Guess</Button> 
    </StyledMap>
  )
}

export default Map
