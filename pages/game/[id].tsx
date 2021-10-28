import type { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React, { FC, useEffect, useState } from 'react'
import { StreetView } from '../../components/StreetView'
import { Map } from '../../components/Map'
import { GameType, LocationType, MapType } from '../../types'
import { ResultView } from '../../components/ResultView'
import { useDispatch, useSelector } from 'react-redux'
import { StreetViewControls } from '../../components/StreetViewControls'
import { GameStatus } from '../../components/GameStatus'
import { Brazil, CanadaCities, Europe, FamousLocations, generateCanada, generateLocations, generateUS, getLocationsFromMapId, getRandomLocationsInRadius } from '../../utils/functions/generateLocations'
import { OldStreetView } from '../../components/OldStreetView'
import { Map2 } from '../../components/Map2'
import { fireDb } from '../../utils/firebaseConfig'
import { mailman } from '../../backend/utils/mailman'
import router, { useRouter } from 'next/router'
import Game from '../../backend/models/game'
import { clearPrevGame, resetGame, selectGameNew, setGame, updateId } from '../../redux/gameNew'
import { Spinner } from '../../components/System/Spinner'
import StyledGamePage from '../../styles/GamePage.Styled'
import { ResultMap } from '../../components/ResultMap'
import { FinalResultsCard } from '../../components/FinalResultsCard'
import { ResultsCard } from '../../components/ResultsCard'

/*
export const getServerSideProps: GetServerSideProps = async (context) => {
  const gameId = context.query.id as string
  const game = await mailman(`games/${gameId}`)

  const gameData = {
    id: gameId, 
    ...game
  }
 
  return {
    props: { gameData }, 
  }
}

type Props = {
  gameData: Game
}
*/

const GamePage: FC = () => {
  const [view, setView] = useState<'Game' | 'Result' | 'FinalResults'>('Game')
  const [gameData, setGameData] = useState<Game>()
  const router = useRouter()
  const gameId = router.query.id as string
  console.log(gameId)
  const [fetching, setFetching] = useState(false)
  

  const fetchGame = async () => {
    const game = await mailman(`games/${gameId}`)

    const gameData = {
      id: gameId, ...game
    }

    setGameData(gameData)
  }

  useEffect(() => {
    if (!gameId) {
      return
    }
    fetchGame()
    

  }, [gameId, view])

  console.log(gameData?.guesses)

  if (!gameData) {
    return <Spinner />
  }

  return (
    <StyledGamePage>
      {view === 'Game' ?
        <StreetView 
          gameData={gameData}
          setGameData={setGameData}
          setView={setView} 
        />

        :

        <>
          {view === 'Result' &&
            <ResultMap 
              guessedLocations={gameData.guesses} 
              actualLocations={gameData.rounds} 
              round={gameData.round}
            />
          }

          {view === 'FinalResults' &&
            <ResultMap 
              guessedLocations={gameData.guesses} 
              actualLocations={gameData.rounds} 
              round={gameData.round}
              isFinalResults
            />
          }
       
        
        
          <div className="resultsWrapper">
            {view === 'FinalResults' ? 
              <FinalResultsCard totalPoints={gameData.totalPoints} /> :
              <ResultsCard 
                round={gameData.round}
                distance={gameData.guesses.length > 0 ? gameData.guesses[gameData.guesses.length - 1].distance : 10}
                points={gameData.guesses.length > 0 ? gameData.guesses[gameData.guesses.length - 1].points : 10}
                setView={setView}
              /> 
            }       
          </div>
         
          
          </>
      }  
    </StyledGamePage>
  
  )
}

export default GamePage

