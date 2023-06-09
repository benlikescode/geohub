import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Game from '@backend/models/game'
import { mailman } from '@backend/utils/mailman'
import { Head } from '@components/Head'
import { LoadingPage } from '@components/Layout'
import { StandardFinalResults, StandardResults, StreakResults } from '@components/ResultCards'
import { ResultMap } from '@components/ResultMap'
import { StreaksResultMap } from '@components/StreaksResultMap'
import { StreetView } from '@components/StreetView'
import { useAppDispatch } from '@redux/hook'
import { updateRecentlyPlayed } from '@redux/slices'
import StyledGamePage from '@styles/GamePage.Styled'
import { PageType } from '@types'
import { NotFound } from '../../components/errorViews/NotFound'
import { StreakFinalResults } from '../../components/ResultCards/StreakFinalResults'
import { StreaksSummaryMap } from '../../components/StreaksSummaryMap'

const GamePage: PageType = () => {
  const [view, setView] = useState<'Game' | 'Result' | 'FinalResults'>('Game')
  const [gameData, setGameData] = useState<Game | null>()
  const router = useRouter()
  const gameId = router.query.id as string
  const dispatch = useAppDispatch()

  const fetchGame = async () => {
    const res = await mailman(`games/${gameId}`)

    // If game not found -> show error page
    if (res.error) {
      return setGameData(null)
    }

    const { game, gameBelongsToUser } = res

    if (!gameBelongsToUser) {
      return setGameData(null)
    }

    // If game is completed, set view to Result
    if (game.state === 'finished') {
      setView('Result')
    }

    dispatch(updateRecentlyPlayed({ recentlyPlayed: [] }))

    // HALP -> update this to not need to use "id" -> should be using "_id"
    const gameData = {
      id: gameId,
      ...game,
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
    return <NotFound title="Game Not Found" message="This game likely does not exist or does not belong to you." />
  }

  if (!gameData) {
    return <LoadingPage />
  }

  return (
    <StyledGamePage>
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
