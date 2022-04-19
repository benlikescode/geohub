import React, { createRef, FC, useEffect, useRef, useState } from 'react'
import StyledAerialPage from '../../styles/AerialPage.Styled'
import mapboxgl from 'mapbox-gl'
import { mailman } from '../../backend/utils/mailman'
import { useRouter } from 'next/router'
import Game from '../../backend/models/game'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/user'
import { LocationType } from '../../types'
import { LoadingPage } from '../../components/Layout'
import DefaultErrorPage from 'next/error'
import { GuessMap } from '../../components/Mapbox/GuessMap'
import { FinalResultsCard } from '../../components/FinalResultsCard'
import { ResultsCard } from '../../components/ResultsCard'
import { ResultMap } from '../../components/Mapbox/ResultMap'

const AerialPage: FC = () => {
  mapboxgl.accessToken = 'pk.eyJ1IjoiYmVubGlrZXNjb2RlIiwiYSI6ImNsMXFxbXAwYjFxNjMzZW1tazQ5N21jZTgifQ.bt9S5fzwugjjnZT0eR_wnQ'
  const mapContainer = useRef<any>(null)
  const guessMap = createRef<HTMLDivElement>()
  const MIN_ZOOM = 15
  const [lat, setLat] = useState(37.5600)
  const [lng, setLng] = useState(126.9900)
  const [zoom, setZoom] = useState(15)
  const [gameData, setGameData] = useState<Game | null>()
  const [view, setView] = useState<'Game' | 'Result' | 'FinalResults'>('Game')
  const router = useRouter()
  const gameId = router.query.id as string
  const user = useSelector(selectUser)
  const [currGuess, setCurrGuess] = useState<LocationType | null>(null)
  const mapRef = useRef<any>(null)
  const BOUND_RADIUS = 0.05

  useEffect(() => {
    if (!mapContainer.current || !gameData || gameData.round > 5) return

    const location = gameData.rounds[gameData.round - 1]

    const bounds = [
      [location.lng - BOUND_RADIUS, location.lat - BOUND_RADIUS],
      [location.lng + BOUND_RADIUS, location.lat + BOUND_RADIUS]
    ]

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: [location.lng, location.lat],
      zoom: zoom,
      minZoom: MIN_ZOOM,
      attributionControl: false,
      maxBounds: bounds as mapboxgl.LngLatBoundsLike
    })

    return () => map.remove()
  }, [gameData])

  const fetchGame = async () => {
    const { status, res } = await mailman(`aerial/${gameId}`)

    // if game not found, set gameData to null so an error page can be displayed
    if (status === 404 || status === 500) {
      return setGameData(null)
    }

    // To make it more secure, I could do this in gSSP (this is fine for now)
    if (res.userId !== user.id) {
      router.push('/')
    }

    // if game is completed, set view to Result
    if (res.round > 5) {
      setView('Result')
    }

    const gameData = {
      id: gameId, ...res
    }

    setGameData(gameData)
  }

  useEffect(() => {
    if (!gameId) {
      return
    }

    if (view === 'Game') {
      fetchGame()
    }

  }, [gameId, view])

  if (gameData === null) {
    return <DefaultErrorPage statusCode={500}/>
  }

  if (!gameData) {
    return <LoadingPage />
  }

  return (
    <StyledAerialPage>
      {view === 'Game' && (
        <div className="mapContainer" ref={mapContainer}>
          <GuessMap 
            currGuess={currGuess}
            setCurrGuess={setCurrGuess}
            gameData={gameData}
            setGameData={setGameData}
            setView={setView}
            gameMode="aerial"     
          />
        </div>
      )}

      {view === 'Result' && (
        <ResultMap
          guessedLocations={gameData.guesses} 
          actualLocations={gameData.rounds} 
          round={gameData.round}
        />
      )}

      {view === 'FinalResults' && (
        <ResultMap
          guessedLocations={gameData.guesses} 
          actualLocations={gameData.rounds} 
          round={gameData.round}
          isFinalResults
        />
      )}

      {view !== 'Game' && (
        <div className="resultsWrapper">
          {view === 'FinalResults' ? 
            <FinalResultsCard gameData={gameData} /> :
            <ResultsCard 
              round={gameData.round}
              distance={gameData.guesses[gameData.guesses.length - 1].distance}
              points={gameData.guesses[gameData.guesses.length - 1].points}
              setView={setView}
            /> 
          }       
        </div>               
      )} 
    </StyledAerialPage> 
  )
}

export default AerialPage