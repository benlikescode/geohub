import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ChallengeStart } from '@components/ChallengeStart'
import { NotFound } from '@components/errorViews'
import { StandardGameView, StreakGameView } from '@components/gameViews'
import { Head } from '@components/Head'
import { LoadingPage } from '@components/layout'
import { useAppDispatch } from '@redux/hook'
import { updateStartTime } from '@redux/slices'
import StyledGamePage from '@styles/GamePage.Styled'
import { ChallengeType, GameType, GameViewType, PageType } from '@types'
import { mailman, showToast } from '@utils/helpers'

const ChallengePage: PageType = () => {
  const [view, setView] = useState<GameViewType>('Game')
  const [challengeData, setChallengeData] = useState<ChallengeType | null>()
  const [gameData, setGameData] = useState<GameType | null>()

  const router = useRouter()
  const challengeId = router.query.id as string
  const dispatch = useAppDispatch()

  const fetchChallenge = async () => {
    const res = await mailman(`challenges/${challengeId}`)

    const { challengeBelongsToUser, playersGame, mapDetails } = res

    // If challenge not found -> show error page
    if (res.error) {
      return setChallengeData(null)
    }

    setChallengeData(res)

    // If the user has not started the challenge yet
    if (!playersGame) {
      return challengeBelongsToUser ? await createGame() : setView('Start')
    }

    // If they have finished the game, push to results page
    if (playersGame.state === 'finished') {
      return router.replace(`/results/challenge/${challengeId}`)
    }

    // If they have not finished the game, set their game state
    setGameData({ ...playersGame, mapDetails })
  }

  const createGame = async () => {
    const res = await mailman(`challenges/${challengeId}`, 'POST')

    if (res.error) {
      return showToast('error', res.error.message)
    }

    setGameData(res)
    dispatch(updateStartTime({ startTime: new Date().getTime() }))
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

      {gameData.mode === 'standard' && (
        <StandardGameView gameData={gameData} setGameData={setGameData} view={view} setView={setView} />
      )}

      {gameData.mode === 'streak' && (
        <StreakGameView gameData={gameData} setGameData={setGameData} view={view} setView={setView} />
      )}
    </StyledGamePage>
  )
}

ChallengePage.noLayout = true

export default ChallengePage
