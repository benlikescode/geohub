import React, { FC, useEffect, useState } from 'react'
import { StyledStreetView } from '.'
import GoogleMapReact from 'google-map-react'
import { LocationType } from '../../types'
import { useDispatch, useSelector } from 'react-redux'
import { useDebounce } from '../../utils/hooks/useDebounce'
import { Spinner } from '../System/Spinner'
import { StreetViewControls } from '../StreetViewControls'
import { GameStatus } from '../GameStatus'
import { Map2 } from '../Map2'
import { selectGameNew } from '../../redux/gameNew'
import { Game } from '../../backend/models'
import { LoadingPage } from '../Layout'

type Props = {
  gameData: Game
  setView: (view: 'Game' | 'Result' | 'FinalResults') => void
  setGameData: any
}

const StreetView: FC<Props> = ({ gameData, setView, setGameData }) => {
  const [compassHeading, setCompassHeading] = useState(0)
  //useDebounce(() => setCompassHeading(compassHeading), 50, [compassHeading])
  const [loading, setLoading] = useState(true)

  const location = gameData.rounds[gameData.round - 1]

  const googleKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string

  const GoogleMapConfig = {
    key: googleKey
  }

  const handleApiLoaded = (map: any, maps: any) => {
    var sv = new window.google.maps.StreetViewService()
    var panorama = new window.google.maps.StreetViewPanorama(
      document.getElementById('map') as HTMLElement, {         
        addressControl: false,
        linksControl: gameData.gameSettings.canMove,
        panControl: true,
        panControlOptions: { position: google.maps.ControlPosition.TOP_LEFT },
        enableCloseButton: false,
        zoomControl: false,
        fullscreenControl: false,
      }
    )
    panorama.setOptions({
      showRoadLabels: false,
      clickToGo: gameData.gameSettings.canMove,
      scrollwheel: gameData.gameSettings.canZoom,
    })
    /*
    panorama.addListener('pov_changed', () => {
      setCompassHeading(panorama.getPov().heading)
    })
    */

    const processSVData = (data: any, status: any) => {
      if (data == null) {
        alert('There was an error loading the round :(')
      }
      else {
        panorama.setPano(data.location.pano)
        panorama.setPov({
          heading: location.heading || 0,
          pitch: location.pitch || 0
        })
        panorama.setZoom(location.zoom || 0)
        panorama.setVisible(true)
      }     
    }

    sv.getPanorama({location: location, radius: 50,}, processSVData)
  
    setLoading(false)
  }

  return (
    <StyledStreetView>
      {loading && <LoadingPage />}
      
      <div id="map">
        <StreetViewControls compassHeading={compassHeading} />
        <GameStatus gameData={gameData}/> 
        <Map2 coordinate={location} zoom={8} setView={setView} setGameData={setGameData} gameData={gameData} />
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