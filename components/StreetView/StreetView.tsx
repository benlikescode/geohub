import React, { FC, useState } from 'react'
import { StyledStreetView } from '.'
import GoogleMapReact from 'google-map-react'
import { StreetViewControls } from '../StreetViewControls'
import { GameStatus } from '../GameStatus'
import { GuessMap } from '../GuessMap'
import { Game } from '../../backend/models'
import { LoadingPage } from '../Layout'
import { selectGame } from '../../redux/game'
import { useDispatch, useSelector } from 'react-redux'

const StreetView: FC = () => {
  const [loading, setLoading] = useState(true)
  const game = useSelector(selectGame)
  const dispatch = useDispatch()
  const location = game.gameData.rounds[game.gameData.round - 1]
  const googleKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string

  const GoogleMapConfig = {
    key: googleKey
  }

  const handleApiLoaded = (map: any, maps: any) => {
    var sv = new window.google.maps.StreetViewService()
    var panorama = new window.google.maps.StreetViewPanorama(
      document.getElementById('map') as HTMLElement, {         
        addressControl: false,
        linksControl: game.gameData.gameSettings.canMove,
        panControl: true,
        panControlOptions: { position: google.maps.ControlPosition.LEFT_BOTTOM },
        enableCloseButton: false,
        zoomControl: false,
        fullscreenControl: false,
      }
    )
    panorama.setOptions({
      showRoadLabels: false,
      clickToGo: game.gameData.gameSettings.canMove,
      scrollwheel: game.gameData.gameSettings.canZoom,
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

    sv.getPanorama({location: location, radius: 50,}, processSVData)
  
    setLoading(false)
  }

  return (
    <StyledStreetView>
      {loading && <LoadingPage />}
      
      <div id="map">
        <StreetViewControls/>
        <GameStatus /> 
        <GuessMap coordinate={location} zoom={8} />
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