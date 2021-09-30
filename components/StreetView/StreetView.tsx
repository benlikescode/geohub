import { FC, useState } from 'react'
import { StyledStreetView } from '.'
import GoogleMapReact from 'google-map-react'
import { LocationType } from '../../types'
import { useDispatch } from 'react-redux'
import { updateCompass } from '../../redux/game'
import { useDebounce } from '../../utils/hooks/useDebounce'

type Props = {
  location: LocationType
  zoom: number
  setCompassHeading: (compassHeading: number) => void
}

const Map: FC<Props> = ({ location, zoom, setCompassHeading }) => {
  const [ch, setCh] = useState(0)
  useDebounce(() => setCompassHeading(ch), 50, [ch])

  const googleKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string

  const GoogleMapConfig = {
    key: googleKey,
    libraries: 'places'
  }

  const handleApiLoaded = (map: any, maps: any) => {
    var sv = new maps.StreetViewService()
    var panorama = new maps.StreetViewPanorama(
      document.getElementById('map'), {  
        panControlOptions: {
          position: google.maps.ControlPosition.BOTTOM_LEFT,
        },
        zoomControlOptions: {
          position: google.maps.ControlPosition.BOTTOM_LEFT,
        },       
        addressControl: false,
        linksControl: false,
        panControl: false,
        enableCloseButton: false,
        zoomControl: false,
        fullscreenControl: false,
      }
    )
    panorama.setOptions({
      showRoadLabels: false
    })
    sv.getPanorama({location: location, radius: 50}, processSVData)

    function processSVData(data: any, status: any) {
      var marker = new maps.Marker({
        position: data.location.latLng,
        map: map,
        title: data.location.description
      })
      panorama.setPano(data.location.pano)
      panorama.setPov({
        heading: 0,
        pitch: 0
      })
      panorama.setVisible(true)
    }
    panorama.addListener('pov_changed', () => {
      setCh(panorama.getPov().heading)
    })
  }

  return (
    <StyledStreetView>
      <div id="map"></div>
      <GoogleMapReact 
        bootstrapURLKeys={GoogleMapConfig}
        defaultCenter={location} 
        defaultZoom={zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
      </GoogleMapReact>
    </StyledStreetView>
  )
}

export default Map
