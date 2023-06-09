import router from 'next/router'
import { useEffect, useState } from 'react'
import { Game } from '@backend/models'
import { mailman } from '@backend/utils/mailman'
import { Head } from '@components/Head'
import { Navbar } from '@components/layout/Navbar'
import { ResultMap } from '@components/ResultMap'
import { LeaderboardCard } from '@components/Results'
import { GameResultsSkeleton } from '@components/Skeletons/GameResultsSkeleton'
import { FlexGroup } from '@components/System'
import StyledResultPage from '@styles/ResultPage.Styled'
import { MapType, PageType } from '@types'
import { NotFound } from '../../components/errorViews/NotFound'
import { StreaksLeaderboard } from '../../components/StreaksLeaderboard'
import { StreaksSummaryMap } from '../../components/StreaksSummaryMap'

const ResultsPage: PageType = () => {
  const [gameData, setGameData] = useState<Game | null>()
  const [mapData, setMapData] = useState<MapType>()
  const [isGameFinished, setIsGameFinished] = useState<boolean>()
  const gameId = router.query.id as string

  const fetchGame = async () => {
    const res = await mailman(`games/${gameId}`)

    // If game not found -> show error page
    if (res.error) {
      return setGameData(null)
    }

    const game = res.game as Game

    setIsGameFinished(game.state === 'finished')
    setGameData(game)

    if (game.mode === 'standard') {
      fetchMap(game.mapId)
    }
  }

  const fetchMap = async (mapId: string) => {
    const res = await mailman(`maps/${mapId}`)
    setMapData(res)
  }

  useEffect(() => {
    if (!gameId) {
      return
    }

    fetchGame()
  }, [gameId])

  // Game does not exist with this id
  if (gameData === null) {
    return <NotFound message="This Game does not exist." />
  }

  // Game is not finished
  if (isGameFinished === false) {
    return <NotFound message="This game has not been completed." />
  }

  if (gameData?.mode === 'streak') {
    return (
      <StyledResultPage>
        <Head title="Challenge Results" />
        <section>
          <Navbar />

          {!gameData ? (
            <GameResultsSkeleton />
          ) : (
            <main>
              <StreaksSummaryMap gameData={gameData} />

              <FlexGroup justify="center">
                <StreaksLeaderboard gameData={[gameData]} />
              </FlexGroup>
            </main>
          )}
        </section>
      </StyledResultPage>
    )
  }

  return (
    <StyledResultPage>
      <Head title="Game Results" />

      {!gameData || !mapData ? (
        <GameResultsSkeleton />
      ) : (
        <section>
          <Navbar />
          <main>
            <ResultMap
              guessedLocations={gameData.guesses}
              actualLocations={gameData.rounds}
              round={gameData.round}
              isFinalResults
              isLeaderboard
              userAvatar={gameData.userDetails?.avatar}
            />

            <FlexGroup justify="center">
              <LeaderboardCard gameData={[gameData]} mapData={mapData} />
            </FlexGroup>
          </main>
        </section>
      )}
    </StyledResultPage>
  )
}

ResultsPage.noLayout = true

export default ResultsPage
