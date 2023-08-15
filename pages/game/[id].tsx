import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Game from '@backend/models/game'
import { NotFound } from '@components/errorViews'
import { Head } from '@components/Head'
import { LoadingPage } from '@components/layout'
import { StandardGameView } from '@components/StandardGameView'
import { StreaksGameView } from '@components/StreaksGameView'
import { useAppDispatch } from '@redux/hook'
import { updateRecentlyPlayed } from '@redux/slices'
import StyledGamePage from '@styles/GamePage.Styled'
import { GameViewType, PageType } from '@types'
import { mailman } from '@utils/helpers'

const GamePage: PageType = () => {
  const [view, setView] = useState<GameViewType>('Game')
  const [gameData, setGameData] = useState<Game | null>()
  const [prevGameId, setPrevGameId] = useState('')
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
    setPrevGameId(gameId)
  }

  useEffect(() => {
    if (!gameId) {
      return
    }

    if (view === 'Game') {
      fetchGame()
    }
  }, [gameId, view])

  useEffect(() => {
    if (gameId !== prevGameId) {
      setView('Game')
    }
  }, [gameId])

  if (gameData === null) {
    return <NotFound title="Game Not Found" message="This game likely does not exist or does not belong to you." />
  }

  if (!gameData) {
    return <LoadingPage />
  }

  return (
    <StyledGamePage>
      <Head title={`Game - GeoHub`} />

      {gameData.mode === 'standard' && (
        <StandardGameView gameData={gameData} setGameData={setGameData} view={view} setView={setView} />
      )}

      {gameData.mode === 'streak' && (
        <StreaksGameView gameData={gameData} setGameData={setGameData} view={view} setView={setView} />
      )}
    </StyledGamePage>
  )
}

GamePage.noLayout = true

export default GamePage
