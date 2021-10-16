import React, { FC, useEffect, useState } from 'react'
import { StyledStreetView } from '.'
import GoogleMapReact from 'google-map-react'
import { LocationType } from '../../types'
import { useDispatch, useSelector } from 'react-redux'
import { selectGame, updateActualLocations, updateCompass } from '../../redux/game'
import { useDebounce } from '../../utils/hooks/useDebounce'
import { Spinner } from '../System/Spinner'
import { StreetViewControls } from '../StreetViewControls'
import { GameStatus } from '../GameStatus'
import { Map2 } from '../Map2'

type Props = {
  location: LocationType
}

const StreetView: FC<Props> = ({ location }) => {
  const [compassHeading, setCompassHeading] = useState(0)
  //useDebounce(() => setCompassHeading(compassHeading), 50, [compassHeading])
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

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
      setCompassHeading(panorama.getPov().heading)
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
  
    setLoading(false)
  }

  return (
    <StyledStreetView>
      {loading &&
        <div className="loadingView">
          <Spinner />
        </div>
      }
      
      <div id="map">
        <StreetViewControls compassHeading={compassHeading} />
        <GameStatus /> 
        <Map2 coordinate={location} zoom={8} />
      </div>

      <GoogleMapReact 
        bootstrapURLKeys={GoogleMapConfig}
        center={location} 
        zoom={11}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
      </GoogleMapReact>
    </StyledStreetView>
  )
}

export default StreetView