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
  //useDebounce(() => setCompassHeading(ch), 50, [ch])
  const dispatch = useDispatch()

  const game = useSelector(selectGame)

  const googleKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string

  const GoogleMapConfig = {
    key: googleKey
  }

  const handleApiLoaded = (map: any, maps: any) => {
    var sv = new window.google.maps.StreetViewService()
    var panorama = new window.google.maps.StreetViewPanorama(
      document.getElementById('map') as HTMLElement, {         
        addressControl: false,
        linksControl: true,
        panControl: true,
        enableCloseButton: false,
        zoomControl: false,
        fullscreenControl: false,
      }
    )
    panorama.setOptions({
      showRoadLabels: false,
      clickToGo: game.gameSettings.canMove,
      scrollwheel: game.gameSettings.canZoom,
    })
    /*
    panorama.addListener('pov_changed', () => {
      setCh(panorama.getPov().heading)
    })
    */

    const processSVData = (data: any, status: any) => {
      if (data == null) {
        alert('There was an error loading the round :(')
        return dispatch(updateActualLocations({
          actualLocation: {lat: 0, lng: 0}
        }))
      }
      else {
        dispatch(updateActualLocations({
          actualLocation: {lat: data.location.latLng?.lat(), lng: data.location.latLng?.lng()}
        }))
        panorama.setPano(data.location.pano)
        panorama.setPov({
          heading: 0,
          pitch: 0
        })
        panorama.setZoom(0)
        panorama.setVisible(true)
      }
      
    }

   
      sv.getPanorama({location: location, radius: 50,}, processSVData)
    
   

  }

  return (
    <StyledStreetView>
      <div id="map"></div>
      <GoogleMapReact 
        bootstrapURLKeys={GoogleMapConfig}
        center={location} 
        zoom={zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
      </GoogleMapReact>
    </StyledStreetView>
  )
}

export default StreetView