import GoogleMapReact from 'google-map-react'
import React, { FC, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import { Game } from '@backend/models'
import { mailman } from '@backend/utils/mailman'
import { GameStatus } from '@components/GameStatus'
import { GuessMap } from '@components/GuessMap'
import { LoadingPage } from '@components/Layout'
import { StreaksGuessMap } from '@components/StreaksGuessMap'
import { StreetViewControls } from '@components/StreetViewControls'
import { Spinner } from '@components/System'
import { MapIcon } from '@heroicons/react/outline'
import { selectGame } from '@redux/game'
import { selectUser } from '@redux/user'
import { GuessType, LocationType } from '@types'
import { KEY_CODES } from '@utils/constants/keyCodes'
import { getResultData } from '@utils/helperFunctions'

import { StyledStreetView } from './'

type Props = {
  gameData: Game
  setView: (view: 'Game' | 'Result' | 'FinalResults') => void
  setGameData: any
}

const StreetView: FC<Props> = ({ gameData, setView, setGameData }) => {
  const [loading, setLoading] = useState(true)
  const [currGuess, setCurrGuess] = useState<LocationType | null>(null)
  const [adjustedLocation, setAdjustedLocation] = useState<LocationType | null>(null)
  const [mobileMapOpen, setMobileMapOpen] = useState(false)
  const location = gameData.rounds[gameData.round - 1]
  const googleKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string
  const game = useSelector(selectGame)
  const user = useSelector(selectUser)
  const panoramaRef = useRef<google.maps.StreetViewPanorama | null>(null)

  console.log(`INITIAL COORDS: ${JSON.stringify(location)}`)

  const GoogleMapConfig = {
    key: googleKey,
  }

  const handleSubmitGuess = async () => {
    if (currGuess) {
      const body = {
        guess: currGuess,
        guessTime: (new Date().getTime() - game.startTime) / 1000,
        localRound: gameData.round,
        userLocation: user.location,
        timedOut: false,
        timedOutWithGuess: false,
        adjustedLocation,
      }

      const { status, res } = await mailman(`games/${gameData.id}`, 'PUT', JSON.stringify(body))

      if (status !== 400 && status !== 500) {
        setGameData({ id: res._id, ...res })
        setView('Result')
      }
    }
  }

  const handleBackToStart = () => {
    if (!panoramaRef.current) return

    panoramaRef.current.setPosition(adjustedLocation)

    // Have to check heading and pitch exist since Location type has them as possibly undefined...
    if (typeof adjustedLocation?.heading !== 'undefined' && typeof adjustedLocation.pitch !== 'undefined') {
      panoramaRef.current.setPov({ heading: adjustedLocation?.heading, pitch: adjustedLocation?.pitch })
    }
  }

  const handleKeyDown = async (e: KeyboardEvent) => {
    if (e.key === KEY_CODES.SPACE || e.key === KEY_CODES.SPACE_IE11 || e.key === KEY_CODES.ENTER) {
      await handleSubmitGuess()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [currGuess])

  const loadLocation = () => {
    var sv = new window.google.maps.StreetViewService()
    var panorama = new window.google.maps.StreetViewPanorama(document.getElementById('map') as HTMLElement, {
      addressControl: false, // hide address
      linksControl: gameData.gameSettings.canMove, // arrows to move
      panControl: true, // compass
      panControlOptions: {
        position: google.maps.ControlPosition.LEFT_BOTTOM,
      },
      motionTracking: false, // mobile tracking
      motionTrackingControl: false,
      enableCloseButton: false, // hide default UI elements
      zoomControl: false,
      fullscreenControl: false,
      showRoadLabels: false, // hide road labels
      clickToGo: gameData.gameSettings.canMove,
      scrollwheel: gameData.gameSettings.canZoom,
    })

    const processSVData = (data: any, status: any) => {
      if (data == null) {
        console.log('There was an error loading the round :(')
      } else {
        const adjustedLat = data.location.latLng.lat()
        const adjustedLng = data.location.latLng.lng()
        const adjustedLocation = { ...location, lat: adjustedLat, lng: adjustedLng }
        console.log(`ADJUSTED COORDS: ${JSON.stringify(adjustedLocation)}`)

        setAdjustedLocation(adjustedLocation)

        panorama.setPano(data.location.pano)
        panorama.setPov({
          heading: location.heading || 0,
          pitch: location.pitch || 0,
        })
        panorama.setZoom(location.zoom || 0)
        panorama.setVisible(true)
      }
    }

    sv.getPanorama(getPanoSettings(location, gameData.mapId.toString()), processSVData)

    panoramaRef.current = panorama

    setLoading(false)
  }

  const getPanoSettings = (location: LocationType, mapId: string) => {
    // Need a larger radius for Urban World
    if (mapId === '631d1a5be3615f68c5ffc4eb') {
      console.log('me fire')

      return {
        location,
        radius: 1000,
        source: google.maps.StreetViewSource.OUTDOOR,
      }
    }

    return {
      location,
      radius: 50,
    }
  }

  return (
    <StyledStreetView showMap={!loading}>
      {loading && <LoadingPage />}

      <div id="map">
        <StreetViewControls handleBackToStart={handleBackToStart} />
        <GameStatus gameData={gameData} setView={setView} setGameData={setGameData} currGuess={currGuess} />
        <StreaksGuessMap
          coordinate={location}
          zoom={8}
          currGuess={currGuess}
          setCurrGuess={setCurrGuess}
          handleSubmitGuess={handleSubmitGuess}
          mobileMapOpen={mobileMapOpen}
          closeMobileMap={() => setMobileMapOpen(false)}
        />
        <button className="toggle-map-button" onClick={() => setMobileMapOpen(true)}>
          <MapIcon />
        </button>
      </div>

      <GoogleMapReact
        bootstrapURLKeys={GoogleMapConfig}
        center={location}
        zoom={11}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => loadLocation()}
      ></GoogleMapReact>
    </StyledStreetView>
  )
}

export default StreetView
