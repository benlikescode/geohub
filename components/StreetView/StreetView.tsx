import { FC, useEffect, useState } from 'react'
import { StyledStreetView } from '.'
import GoogleMapReact from 'google-map-react'
import { LocationType } from '../../types'
import { useDispatch, useSelector } from 'react-redux'
import { selectGame, updateActualLocations, updateCompass } from '../../redux/game'
import { useDebounce } from '../../utils/hooks/useDebounce'

type Props = {
  location: LocationType
  zoom: number
  setCompassHeading: (compassHeading: number) => void
}

const StreetView: FC<Props> = ({ location, zoom, setCompassHeading }) => {
  const [ch, setCh] = useState(0)
  useDebounce(() => setCompassHeading(ch), 50, [ch])
  const game = useSelector(selectGame)
  const dispatch = useDispatch()

  const googleKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string

  const GoogleMapConfig = {
    key: googleKey,
    libraries: 'places'
  }

  const handleApiLoaded = (map: any, maps: any) => {
    const sv: google.maps.StreetViewService = new maps.StreetViewService()

    const panorama: google.maps.StreetViewPanorama = new maps.StreetViewPanorama(
      document.getElementById('map') as HTMLElement,
      {
        position: location,
        showRoadLabels: false,
        clickToGo: game.gameSettings.canMove,
        scrollwheel: game.gameSettings.canZoom, 
        addressControl: false,
        enableCloseButton: false,
        zoomControl: false,
        fullscreenControl: false,
      }
    )
    
    const processSVData = ({ data }: google.maps.StreetViewResponse) => {
      const location = data.location!
      //console.log(location.latLng?.lat(), location.latLng?.lng())
      dispatch(updateActualLocations({
        actualLocation: {lat: location.latLng?.lat(), lng: location.latLng?.lng()}
      }))
    
      panorama.setPano(location.pano as string)
      panorama.setPov({
        heading: 0,
        pitch: 0,
      })
      panorama.setZoom(0)
      panorama.setVisible(true)  
    }

    // should also be able to specify a preference and source for this but...
    sv.getPanorama({ location: location, radius: 1000000})
      .then(processSVData)
      .catch((e) =>
        console.error("Street View data not found for this location.")
      )

    /*
      panorama.addListener('pov_changed', () => {
        setCh(panorama.getPov().heading)
      })
    */
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

export default StreetView
