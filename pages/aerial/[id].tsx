import React, { FC, useEffect, useState } from 'react'
import StyledAerialPage from '../../styles/AerialPage.Styled'
import Map from 'react-map-gl'
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
  const [gameData, setGameData] = useState<Game | null>()
  const [view, setView] = useState<'Game' | 'Result' | 'FinalResults'>('Game')
  const router = useRouter()
  const gameId = router.query.id as string
  const user = useSelector(selectUser)
  const [currGuess, setCurrGuess] = useState<LocationType | null>(null)
  const MIN_ZOOM = 15
  const BOUND_RADIUS = 0.05

  const fetchGame = async () => {
    const { status, res } = await mailman(`aerial/${gameId}`)

    // If game not found, set gameData to null so an error page can be displayed
    if (status === 404 || status === 500) {
      return setGameData(null)
    }

    // To make it more secure, I could do this in gSSP (this is fine for now)
    if (res.userId !== user.id) {
      router.push('/')
    }

    // If game is completed, set view to Result
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
        <Map
          initialViewState={{ 
            longitude: gameData.rounds[gameData.round - 1].lng, 
            latitude: gameData.rounds[gameData.round - 1].lat, 
            zoom: 15
          }}
          style={{
            height: '100vh',
            position: 'relative'
          }}
          mapStyle="mapbox://styles/mapbox/satellite-v9"
          attributionControl={false}
          maxBounds={[
            [gameData.rounds[gameData.round - 1].lng - BOUND_RADIUS, gameData.rounds[gameData.round - 1].lat - BOUND_RADIUS],
            [gameData.rounds[gameData.round - 1].lng + BOUND_RADIUS, gameData.rounds[gameData.round - 1].lat + BOUND_RADIUS]
          ]}
          minZoom={MIN_ZOOM}
        >
          <GuessMap 
            currGuess={currGuess}
            setCurrGuess={setCurrGuess}
            gameData={gameData}
            setGameData={setGameData}
            setView={setView}
            gameMode="aerial"     
          />
        </Map>        
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