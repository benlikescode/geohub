import type { NextPage } from 'next'
import router from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { Game } from '@backend/models'
import { mailman } from '@backend/utils/mailman'
import { Layout, LoadingPage } from '@components/Layout'
import { Navbar } from '@components/Layout/Navbar'
import { ResultMap } from '@components/ResultMap'
import { LeaderboardCard } from '@components/Results'
import { GameResultsSkeleton } from '@components/Skeletons/GameResultsSkeleton'
import { FlexGroup } from '@components/System'
import { selectUser } from '@redux/user'
import StyledResultPage from '@styles/ResultPage.Styled'
import { MapType } from '@types'

const ChallengeResultsPage: NextPage = () => {
  const [gamesFromChallenge, setGamesFromChallenge] = useState<Game[] | null>()
  const [mapData, setMapData] = useState<MapType>()
  const [selectedGameIndex, setSelectedGameIndex] = useState(0)
  const challengeId = router.query.id as string
  const user = useSelector(selectUser)

  const fetchGames = async () => {
    const { status, res } = await mailman(`scores/challenges/${challengeId}`)

    // If game not found, set gameData to null so an error page can be displayed
    if (status === 404 || status === 400 || status === 500) {
      return setGamesFromChallenge(null)
    }

    setGamesFromChallenge(res.games)
    setMapData(res.map)
  }

  const getDefaultGameToShow = () => {
    const thisUserIndex = gamesFromChallenge?.map((game) => game.userId.toString()).indexOf(user?.id)

    if (thisUserIndex && thisUserIndex !== -1) {
      setSelectedGameIndex(thisUserIndex)
    }
  }

  useEffect(() => {
    if (!challengeId) {
      return
    }

    fetchGames()
  }, [challengeId])

  useEffect(() => {
    getDefaultGameToShow()
  }, [gamesFromChallenge])

  if (gamesFromChallenge === null) {
    return (
      <StyledResultPage>
        <Layout>
          <div className="errorContainer">
            <div className="errorContent">
              <h1 className="errorPageTitle">Page not found</h1>
              <span className="errorPageMsg">This challenge does not exist or has not been played yet</span>
            </div>
            <div className="errorGif"></div>
          </div>
        </Layout>
      </StyledResultPage>
    )
  }

  return (
    <StyledResultPage>
      <section>
        <Navbar />

        {!gamesFromChallenge || !mapData ? (
          <GameResultsSkeleton />
        ) : (
          <main>
            <ResultMap
              guessedLocations={gamesFromChallenge[selectedGameIndex].guesses}
              actualLocations={gamesFromChallenge[selectedGameIndex].rounds}
              round={gamesFromChallenge[selectedGameIndex].round}
              isFinalResults
              isLeaderboard
              userAvatar={gamesFromChallenge[selectedGameIndex].userDetails?.avatar}
            />

            <FlexGroup justify="center">
              <LeaderboardCard
                gameData={gamesFromChallenge}
                mapData={mapData}
                selectedGameIndex={selectedGameIndex}
                setSelectedGameIndex={setSelectedGameIndex}
              />
            </FlexGroup>
          </main>
        )}
      </section>
    </StyledResultPage>
  )
}

export default ChallengeResultsPage
