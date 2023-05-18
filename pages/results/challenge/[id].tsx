import router from 'next/router'
import { useEffect, useState } from 'react'
import { Game } from '@backend/models'
import { mailman } from '@backend/utils/mailman'
import { Head } from '@components/Head'
import { Navbar } from '@components/Layout/Navbar'
import { ResultMap } from '@components/ResultMap'
import { LeaderboardCard } from '@components/Results'
import { GameResultsSkeleton } from '@components/Skeletons/GameResultsSkeleton'
import { FlexGroup } from '@components/System'
import { useAppSelector } from '@redux/hook'
import StyledResultPage from '@styles/ResultPage.Styled'
import { MapType, PageType } from '@types'
import { NotFound } from '../../../components/ErrorViews/NotFound'
import { StreaksLeaderboard } from '../../../components/StreaksLeaderboard'
import { StreaksSummaryMap } from '../../../components/StreaksSummaryMap'

const ChallengeResultsPage: PageType = () => {
  const [gamesFromChallenge, setGamesFromChallenge] = useState<Game[] | null>()
  const [mapData, setMapData] = useState<MapType>()
  const [selectedGameIndex, setSelectedGameIndex] = useState(0)
  const challengeId = router.query.id as string
  const user = useAppSelector((state) => state.user)

  const fetchGames = async () => {
    const res = await mailman(`scores/challenges/${challengeId}`)

    // If game not found -> show error page
    if (res.error) {
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
    return <NotFound message="This challenge does not exist or has not been played yet." />
  }

  if (gamesFromChallenge?.[0].mode === 'streak') {
    return (
      <StyledResultPage>
        <Head title="Challenge Results" />
        <section>
          <Navbar />

          {!gamesFromChallenge || !mapData ? (
            <GameResultsSkeleton />
          ) : (
            <main>
              <StreaksSummaryMap gameData={gamesFromChallenge[selectedGameIndex]} />

              <FlexGroup justify="center">
                <StreaksLeaderboard
                  gameData={gamesFromChallenge}
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

  return (
    <StyledResultPage>
      <Head title="Challenge Results" />
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

ChallengeResultsPage.noLayout = true

export default ChallengeResultsPage
