import type { NextPage } from 'next'
import router from 'next/router'
import React, { useEffect, useState } from 'react'

import { Game } from '@backend/models'
import { mailman } from '@backend/utils/mailman'
import { Head } from '@components/Head'
import { Layout, LoadingPage } from '@components/Layout'
import { Navbar } from '@components/Layout/Navbar'
import { ResultMap } from '@components/ResultMap'
import { LeaderboardCard } from '@components/Results'
import { GameResultsSkeleton } from '@components/Skeletons/GameResultsSkeleton'
import { FlexGroup } from '@components/System'
import StyledResultPage from '@styles/ResultPage.Styled'
import { MapType, PageType } from '@types'

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

    setIsGameFinished(res.state === 'finished')
    setGameData(res)

    fetchMap(res.mapId)
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
    return (
      <StyledResultPage>
        <Layout>
          <div className="errorContainer">
            <div className="errorContent">
              <h1 className="errorPageTitle">Page not found</h1>
              <span className="errorPageMsg">This game does not exist</span>
            </div>
            <div className="errorGif"></div>
          </div>
        </Layout>
      </StyledResultPage>
    )
  }

  // Game is not finished
  if (isGameFinished === false) {
    return (
      <StyledResultPage>
        <Layout>
          <div className="errorContainer">
            <div className="errorContent">
              <h1 className="errorPageTitle">Page not found</h1>
              <span className="errorPageMsg">This game has not been completed</span>
            </div>
            <div className="errorGif"></div>
          </div>
        </Layout>
      </StyledResultPage>
    )
  }

  if (gameData?.mode === 'streak') {
    return (
      <StyledResultPage>
        <Head title="Challenge Results" />
        <section>
          <Navbar />

          {!gameData || !mapData ? (
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
