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
import { useDispatch, useSelector } from 'react-redux'
import DefaultErrorPage from 'next/error'
import { selectGame, updateCurrView, updateGameData, updateGameState } from '../../redux/game'


const GamePage: FC = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const router = useRouter()
  const gameId = router.query.id as string
  const user = useSelector(selectUser)
  const game = useSelector(selectGame)
  const dispatch = useDispatch()

  const fetchGame = async () => {
    const { status, res } = await mailman(`games/${gameId}`)

    // if game not found, set error to true
    if (status === 404 || status === 500) {
      return setError(true)
    }

    // To make it more secure, I could do this in gSSP (this is fine for now)
    if (res.userId !== user.id) {
      if (res.round > 5) {
        dispatch(updateCurrView({ currView: 'FinalResults' }))
      }
      else {
        router.push('/')
      }
    }

   

    const gameData = {
      id: gameId, ...res
    }

    dispatch(updateGameData({ gameData }))
    setLoading(false)
  }

  useEffect(() => {
    if (!gameId) {
      return
    }

    if (game.gameData !== null) {
      if (game.gameData.id !== gameId) {
        dispatch(updateCurrView({
          currView: 'Game'
        }))    
      }
      fetchGame()
    } 
    else {
      fetchGame()
    }

  }, [gameId, game.currView])

  if (error) {
    return <DefaultErrorPage statusCode={500}/>
  }

  if (loading) {
    return <LoadingPage />
  }

  return (
    <StyledGamePage>
      {game.currView === 'Game' ? <StreetView /> :
        <>
          {game.currView === 'Result' &&
            <ResultMap 
              guessedLocations={game.gameData.guesses} 
              actualLocations={game.gameData.rounds} 
              round={game.gameData.round}
              userAvatar={game.gameData.userAvatar}
            />
          }

          {game.currView === 'FinalResults' &&
            <ResultMap 
              guessedLocations={game.gameData.guesses} 
              actualLocations={game.gameData.rounds} 
              round={game.gameData.round}
              userAvatar={game.gameData.userAvatar}
              isFinalResults
            />
          }
             
          <div className="resultsWrapper">
            {game.currView === 'FinalResults' ? 
              <FinalResultsCard /> 

              : 

              <ResultsCard 
                round={game.gameData.round}
                distance={game.gameData.guesses[game.gameData.guesses.length - 1].distance}
                points={game.gameData.guesses[game.gameData.guesses.length - 1].points}
              />
            }       
          </div>               
        </>
      }  
    </StyledGamePage> 
  )
}

export default GamePage

