import React, { FC, useEffect, useState } from 'react'
import { StreetView } from '../../components/StreetView'
import { mailman } from '../../backend/utils/mailman'
import { useRouter } from 'next/router'
import Game from '../../backend/models/game'
import StyledGamePage from '../../styles/GamePage.Styled'
import { ResultMap } from '../../components/ResultMap'
import { FinalResultsCard } from '../../components/FinalResultsCard'
import { ResultsCard } from '../../components/ResultsCard'
import { LoadingPage } from '../../components/Layout'
import { selectUser } from '../../redux/user'
import { useSelector } from 'react-redux'

const GamePage: FC = () => {
  const [view, setView] = useState<'Game' | 'Result' | 'FinalResults'>('Game')
  const [gameData, setGameData] = useState<Game>()
  const router = useRouter()
  const gameId = router.query.id as string
  const user = useSelector(selectUser)
  
  const fetchGame = async () => {
    const { res } = await mailman(`games/${gameId}`)

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

  if (!gameData) {
    return <LoadingPage />
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
              <FinalResultsCard gameData={gameData} /> :
              <ResultsCard 
                round={gameData.round}
                distance={gameData.guesses[gameData.guesses.length - 1].distance}
                points={gameData.guesses[gameData.guesses.length - 1].points}
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

