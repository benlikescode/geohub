import type { NextPage } from 'next'
import router from 'next/router'
import React, { useEffect, useState } from 'react'
import { Game } from '../../../backend/models'
import { mailman } from '../../../backend/utils/mailman'
import { Layout, LoadingPage } from '../../../components/Layout'
import { Navbar } from '../../../components/Layout/Navbar'
import { ResultMap } from '../../../components/ResultMap'
import { LeaderboardCard } from '../../../components/Results'
import { FlexGroup } from '../../../components/System'
import StyledResultPage from '../../../styles/ResultPage.Styled'
import { MapType } from '../../../types'

const ChallengeResultsPage: NextPage = () => {
  const [gamesFromChallenge, setGamesFromChallenge] = useState<Game[] | null>()
  const [mapData, setMapData] = useState<MapType>()
  const challengeId = router.query.id as string

  const fetchGames = async () => {
    const { status, res } = await mailman(`scores/challenges/${challengeId}`)

    // If game not found, set gameData to null so an error page can be displayed
    if (status === 404 || status === 500) {
      return setGamesFromChallenge(null)
    }

    setGamesFromChallenge(res.games)
    setMapData(res.map)
  }

  useEffect(() => {
    if (!challengeId) {
      return
    }

    fetchGames()
  }, [challengeId])

  if (!gamesFromChallenge || !mapData) {
    return <LoadingPage />
  }

  return (
    <StyledResultPage>
      {gamesFromChallenge !== null ? (
        <section>
          <Navbar />

          <main>
            <ResultMap
              guessedLocations={gamesFromChallenge[0].guesses}
              actualLocations={gamesFromChallenge[0].rounds}
              round={gamesFromChallenge[0].round}
              isFinalResults
            />

            <FlexGroup justify="center">
              <LeaderboardCard gameData={gamesFromChallenge} mapData={mapData} />
            </FlexGroup>
          </main>
        </section>
      ) : (
        <Layout>
          <section>
            <Navbar />

            <main>
              <div className="errorContainer">
                <div className="errorContent">
                  <h1 className="errorPageTitle">Page not found</h1>
                  <span className="errorPageMsg">
                    {gamesFromChallenge === null
                      ? 'This game does not exist'
                      : 'This game has not been completed'}
                  </span>
                </div>
                <div className="errorGif"></div>
              </div>
            </main>
          </section>
        </Layout>
      )}
    </StyledResultPage>
  )
}

export default ChallengeResultsPage
