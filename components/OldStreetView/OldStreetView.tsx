import { FC, useEffect, useState } from 'react'
import { StyledOldStreetView } from '.'
import GoogleMapReact from 'google-map-react'
import { LocationType } from '../../types'
import { useDispatch, useSelector } from 'react-redux'
import { selectGame, updateCompass } from '../../redux/game'
import { useDebounce } from '../../utils/hooks/useDebounce'

type Props = {
  location: LocationType
  zoom: number
  setCompassHeading: (compassHeading: number) => void
}

const StreetView: FC<Props> = ({ location, zoom, setCompassHeading }) => {
  const [ch, setCh] = useState(0)
  //useDebounce(() => setCompassHeading(ch), 50, [ch])

  const game = useSelector(selectGame)

  useEffect(() => {
    console.log("Return Back To Start")
   
  }, [game.atStart])

  const googleKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string

  const GoogleMapConfig = {
    key: googleKey,
    libraries: 'places'
  }

  const handleApiLoaded = (map: any, maps: any) => {
    var sv = new maps.StreetViewService()
    var panorama = new maps.StreetViewPanorama(
      document.getElementById('map'), {         
        addressControl: false,
        linksControl: false,
        panControl: false,
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

    panorama.addListener('pov_changed', () => {
      setCh(panorama.getPov().heading)
    })

    const processSVData = (data: any, status: any) => {
      panorama.setPano(data.location.pano)
      panorama.setPov({
        heading: 0,
        pitch: 0
      })
      panorama.setZoom(0)
      panorama.setVisible(true)
    }

    sv.getPanorama({location: location, radius: 100000, source: 'outdoor'}, processSVData)
  }

  return (
    <StyledOldStreetView>
      <div id="map"></div>
      <GoogleMapReact 
        bootstrapURLKeys={GoogleMapConfig}
        defaultCenter={location} 
        defaultZoom={zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
      </GoogleMapReact>
    </StyledOldStreetView>
  )
}

export default StreetView