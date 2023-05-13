import DefaultErrorPage from 'next/error'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'

import Game from '@backend/models/game'
import { mailman } from '@backend/utils/mailman'
import { FinalResultsCard } from '@components/FinalResultsCard'
import { Head } from '@components/Head'
import { LoadingPage } from '@components/Layout'
import { StandardFinalResults, StandardResults, StreakResults } from '@components/ResultCards'
import { ResultMap } from '@components/ResultMap'
import { ResultsCard } from '@components/ResultsCard'
import { StreaksResultMap } from '@components/StreaksResultMap'
import { StreetView } from '@components/StreetView'
import { Spinner } from '@components/System'
import { useAppDispatch, useAppSelector } from '@redux/hook'
import { updateRecentlyPlayed } from '@redux/slices'
import StyledGamePage from '@styles/GamePage.Styled'
import { PageType } from '@types'

import { StreakFinalResults } from '../../components/ResultCards/StreakFinalResults'
import { StreaksSummaryMap } from '../../components/StreaksSummaryMap'

const GamePage: PageType = () => {
  const [view, setView] = useState<'Game' | 'Result' | 'FinalResults'>('Game')
  const [gameData, setGameData] = useState<Game | null>()
  const router = useRouter()
  const gameId = router.query.id as string
  const user = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()

  const fetchGame = async () => {
    const res = await mailman(`games/${gameId}`)

    console.log(res)

    // If game not found -> show error page
    if (res.error) {
      return setGameData(null)
    }

    // To make it more secure, I could do this in gSSP (this is fine for now)
    // Actually... just check this on the BE
    if (res.userId !== user.id) {
      router.push('/')
    }

    // If game is completed, set view to Result
    if (res.state === 'finished') {
      setView('Result')
    }

    dispatch(updateRecentlyPlayed({ recentlyPlayed: [] }))

    // TODO: update this to not need to use "id" -> should be using "_id"
    const gameData = {
      id: gameId,
      ...res,
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

  // Should show a better error page than this shit
  if (gameData === null) {
    return <DefaultErrorPage statusCode={500} />
  }

  if (!gameData) {
    return <LoadingPage />
  }

  // // Get Result Map
  // let ResultMapJSX = <></>

  // if (view === 'Result' || view === 'FinalResults') {
  //   if (gameData.mode === 'standard') {
  //     ResultMapJSX = (
  //       <ResultMap
  //         guessedLocations={gameData.guesses}
  //         actualLocations={gameData.rounds}
  //         round={gameData.round}
  //         isFinalResults={view === 'FinalResults'}
  //       />
  //     )
  //   }

  //   if (gameData.mode === 'streak') {
  //     ResultMapJSX = <StreaksResultMap gameData={gameData} />
  //   }
  // }

  // // Get Result Card
  // let ResultCardJSX = <></>

  // if (gameData.mode === 'standard') {
  //   if (view === 'Result') {
  //     ResultCardJSX = (
  //       <StandardResults
  //         round={gameData.round}
  //         distance={gameData.guesses[gameData.guesses.length - 1].distance}
  //         points={gameData.guesses[gameData.guesses.length - 1].points}
  //         noGuess={
  //           gameData.guesses[gameData.guesses.length - 1].timedOut &&
  //           !gameData.guesses[gameData.guesses.length - 1].timedOutWithGuess
  //         }
  //         setView={setView}
  //       />
  //     )
  //   }

  //   if (view === 'FinalResults') {
  //     ResultCardJSX = <StandardFinalResults gameData={gameData} />
  //   }
  // }

  // if (gameData.mode === 'streak') {
  //   ResultCardJSX = <StreakResults gameData={gameData} setView={setView} />
  // }

  return (
    <StyledGamePage>
      {/* <Head title={`Game - ${gameData.round <= 5 ? `Round ${gameData.round}` : 'Results'}`} /> */}
      <Head title={`Game - GeoHub`} />

      {view === 'Game' && <StreetView gameData={gameData} setGameData={setGameData} setView={setView} />}

      {view !== 'Game' && (
        <>
          {/* Result Maps */}
          {gameData.mode === 'standard' && view === 'Result' && (
            <ResultMap guessedLocations={gameData.guesses} actualLocations={gameData.rounds} round={gameData.round} />
          )}

          {gameData.mode === 'standard' && view === 'FinalResults' && (
            <ResultMap
              guessedLocations={gameData.guesses}
              actualLocations={gameData.rounds}
              round={gameData.round}
              isFinalResults
            />
          )}

          {gameData.mode === 'streak' && view === 'Result' && <StreaksResultMap gameData={gameData} />}

          {gameData.mode === 'streak' && view === 'FinalResults' && <StreaksSummaryMap gameData={gameData} />}

          {/* Result Cards */}
          <div className="resultsWrapper">
            {gameData.mode === 'standard' && view === 'Result' && (
              <StandardResults
                round={gameData.round}
                distance={gameData.guesses[gameData.guesses.length - 1].distance}
                points={gameData.guesses[gameData.guesses.length - 1].points}
                noGuess={
                  gameData.guesses[gameData.guesses.length - 1].timedOut &&
                  !gameData.guesses[gameData.guesses.length - 1].timedOutWithGuess
                }
                setView={setView}
              />
            )}

            {gameData.mode === 'standard' && view === 'FinalResults' && <StandardFinalResults gameData={gameData} />}

            {gameData.mode === 'streak' && view === 'Result' && <StreakResults gameData={gameData} setView={setView} />}

            {gameData.mode === 'streak' && view === 'FinalResults' && (
              <StreakFinalResults gameData={gameData} setView={setView} />
            )}
          </div>
        </>
      )}
      <></>
    </StyledGamePage>
  )
}

GamePage.noLayout = true

export default GamePage
