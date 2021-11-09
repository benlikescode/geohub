import React, { FC, useState } from 'react'
import { StyledStreetView } from '.'
import GoogleMapReact from 'google-map-react'
import { StreetViewControls } from '../StreetViewControls'
import { GameStatus } from '../GameStatus'
import { GuessMap } from '../GuessMap'
import { Game } from '../../backend/models'
import { LoadingPage } from '../Layout'

type Props = {
  gameData: Game
  setView: (view: 'Game' | 'Result' | 'FinalResults') => void
  setGameData: any
}

const StreetView: FC<Props> = ({ gameData, setView, setGameData }) => {
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
        panControlOptions: { position: google.maps.ControlPosition.LEFT_BOTTOM },
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

    sv.getPanorama({
      location: location, 
      radius: gameData.mapId === 'near-you' ? 50000 : 50
    }, processSVData)
  
    setLoading(false)
  }

  return (
    <StyledStreetView>
      {loading && <LoadingPage />}
      
      <div id="map">
        <StreetViewControls/>
        <GameStatus gameData={gameData} setView={setView}/> 
        <GuessMap coordinate={location} zoom={8} setView={setView} setGameData={setGameData} gameData={gameData} />
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