import { FC, useEffect, useRef, useState } from 'react'
import { StyledOldStreetView } from '.'
import { LocationType } from '../../types'
import { useDispatch, useSelector } from 'react-redux'
import { selectGame, updateActualLocations, updateCompass } from '../../redux/game'
import { useDebounce } from '../../utils/hooks/useDebounce'
import { Loader } from '@googlemaps/js-api-loader';

type Props = {
  location: LocationType
  zoom: number
  setCompassHeading: (compassHeading: number) => void
}

const StreetView: FC<Props> = ({ location, zoom, setCompassHeading }) => {
  const [ch, setCh] = useState(0)
  //useDebounce(() => setCompassHeading(ch), 50, [ch])
  const game = useSelector(selectGame)
  const dispatch = useDispatch()
  const googlemap = useRef(null)
  const googleKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string

  useEffect(() => {
    const loader = new Loader({
      apiKey: googleKey,
      version: 'weekly',
    })
  
    loader.load().then(() => {   
      onLoad()
    })
  }, [])

  const onLoad = () => {
    const sv = new window.google.maps.StreetViewService()
    const panorama = new window.google.maps.StreetViewPanorama(googlemap.current!, {
      addressControl: false,
      enableCloseButton: false,
      zoomControl: false,
      fullscreenControl: false,
    })  
    panorama.setOptions({
      showRoadLabels: false,
      clickToGo: game.gameSettings.canMove,
      scrollwheel: game.gameSettings.canZoom,
    })

    const processSVData = (data: any, status: any) => {
      panorama.setPano(data.location.pano)

      // dispatching to redux, the updated real location (that is within radius of location)
      dispatch(updateActualLocations({
        actualLocation: {lat: data.location.latLng?.lat(), lng: data.location.latLng?.lng()}
      }))
      
      panorama.setPov({
        heading: 0,
        pitch: 0
      })
      panorama.setZoom(0)
      panorama.setVisible(true)
    }

    sv.getPanorama({location: location, radius: 500000}, processSVData)
  }

 

  return (
    <StyledOldStreetView>
      <div id="map" ref={googlemap}></div>
      
    </StyledOldStreetView>
  )
}

export default StreetView