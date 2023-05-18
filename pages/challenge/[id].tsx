import DefaultErrorPage from 'next/error'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Game from '@backend/models/game'
import { mailman } from '@backend/utils/mailman'
import { ChallengeStart } from '@components/ChallengeStart'
import { Head } from '@components/Head'
import { LoadingPage } from '@components/Layout'
import { StandardFinalResults, StandardResults, StreakResults } from '@components/ResultCards'
import { ResultMap } from '@components/ResultMap'
import { StreetView } from '@components/StreetView'
import { useAppDispatch, useAppSelector } from '@redux/hook'
import { updateStartTime } from '@redux/slices'
import StyledGamePage from '@styles/GamePage.Styled'
import { ChallengeType, PageType } from '@types'
import { showErrorToast } from '@utils/helpers/showToasts'
import { StreakFinalResults } from '../../components/ResultCards/StreakFinalResults'
import { StreaksResultMap } from '../../components/StreaksResultMap'
import { StreaksSummaryMap } from '../../components/StreaksSummaryMap'

const ChallengePage: PageType = () => {
  const [view, setView] = useState<'Start' | 'Game' | 'Result' | 'FinalResults'>('Game')
  const [challengeData, setChallengeData] = useState<ChallengeType | null>()
  const [gameData, setGameData] = useState<Game | null>()

  const router = useRouter()
  const challengeId = router.query.id as string
  const user = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()

  const fetchChallenge = async () => {
    const res = await mailman(`challenges/${challengeId}`)

    // If challenge not found -> show error page
    if (res.error) {
      return setChallengeData(null)
    }

    setChallengeData(res)

    console.log(`MAP DETAILS: ${JSON.stringify(res.mapDetails)}`)

    const isThisUsersChallenge = res?.creatorId === user.id
    const userHasStartedChallenge = res.playersGame !== null

    if (!userHasStartedChallenge) {
      return isThisUsersChallenge ? await createGame(res) : setView('Start')
    }

    // If they have finished the game, push to results page
    if (res.playersGame.state === 'finished') {
      return router.push(`/results/challenge/${challengeId}`)
    }

    // If they have not finished the game, set their game state
    const formattedGameData = { id: res.playersGame._id, mapDetails: res.mapDetails, ...res.playersGame }
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

    console.log(`GAME DATA: ${JSON.stringify(res)}`)
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
    return <DefaultErrorPage statusCode={500} />
  }

  if (!challengeData || !gameData) {
    return <LoadingPage />
  }

  return (
    <StyledGamePage>
      <Head title={`Challenge - GeoHub`} />

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
    </StyledGamePage>
  )
}

ChallengePage.noLayout = true

export default ChallengePage
