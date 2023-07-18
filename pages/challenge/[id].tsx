import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Game from '@backend/models/game'
import { ChallengeStart } from '@components/ChallengeStart'
import { NotFound } from '@components/errorViews'
import { Head } from '@components/Head'
import { LoadingPage } from '@components/layout'
import { StandardFinalResults, StandardResults, StreakFinalResults, StreakResults } from '@components/resultCards'
import { ResultMap } from '@components/ResultMap'
import { StreaksResultMap } from '@components/StreaksResultMap'
import { StreaksSummaryMap } from '@components/StreaksSummaryMap'
import { useAppDispatch } from '@redux/hook'
import { updateStartTime } from '@redux/slices'
import StyledGamePage from '@styles/GamePage.Styled'
import { ChallengeType, PageType } from '@types'
import { mailman, showErrorToast } from '@utils/helpers'

const ChallengePage: PageType = () => {
  const [view, setView] = useState<'Start' | 'Game' | 'Result' | 'FinalResults'>('Game')
  const [challengeData, setChallengeData] = useState<ChallengeType | null>()
  const [gameData, setGameData] = useState<Game | null>()

  const router = useRouter()
  const challengeId = router.query.id as string
  const dispatch = useAppDispatch()

  const fetchChallenge = async () => {
    const res = await mailman(`challenges/${challengeId}`)

    const { challengeBelongsToUser, playersGame } = res

    // If challenge not found -> show error page
    if (res.error) {
      return setChallengeData(null)
    }

    setChallengeData(res)

    // If the user has not started the challenge yet
    if (!playersGame) {
      return challengeBelongsToUser ? await createGame(res) : setView('Start')
    }

    // If they have finished the game, push to results page
    if (playersGame.state === 'finished') {
      return router.push(`/results/challenge/${challengeId}`)
    }

    // If they have not finished the game, set their game state
    const formattedGameData = { id: playersGame._id, ...playersGame }
    setGameData(formattedGameData)
  }

  const createGame = async (challengeData: ChallengeType) => {
    const gameData = {
      mapId: challengeData.mapId,
      mode: challengeData.mode,
      gameSettings: challengeData.gameSettings,
      locations: challengeData.locations,
      isDailyChallenge: challengeData.isDailyChallenge,
    }

    // Store start time
    dispatch(updateStartTime({ startTime: new Date().getTime() }))

    const res = await mailman(`challenges/${challengeId}`, 'POST', JSON.stringify(gameData))

    if (res.error) {
      return showErrorToast(res.error.message)
    }

    setGameData(res)
  }

  useEffect(() => {
    if (!challengeId) {
      return
    }

    if (view === 'Game') {
      fetchChallenge()
    }
  }, [challengeId])

  if (view === 'Start' && challengeData) {
    return <ChallengeStart challengeData={challengeData} handleStartChallenge={createGame} setView={setView} />
  }

  if (challengeData === null || gameData === null) {
    return <NotFound title="Challenge Not Found" message="This challenge does not seem to exist." />
  }

  if (!challengeData || !gameData) {
    return <LoadingPage />
  }

  return (
    <StyledGamePage>
      <Head title={`Challenge - GeoHub`} />

      {/* {view === 'Game' && <StreetView gameData={gameData} setGameData={setGameData} setView={setView} />} */}

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

            {gameData.mode === 'standard' && view === 'FinalResults' && (
              <StandardFinalResults gameData={gameData} setGameData={setGameData} setView={setView} />
            )}

            {gameData.mode === 'streak' && view === 'Result' && <StreakResults gameData={gameData} setView={setView} />}

            {gameData.mode === 'streak' && view === 'FinalResults' && (
              <StreakFinalResults gameData={gameData} setView={setView} />
            )}
          </div>
        </>
      )}
    </StyledGamePage>
  )
}

ChallengePage.noLayout = true

export default ChallengePage
