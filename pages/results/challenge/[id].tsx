import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Game } from '@backend/models'
import { NotFound } from '@components/errorViews'
import { Navbar } from '@components/layout'
import { Meta } from '@components/Meta'
import { ResultMap } from '@components/ResultMap'
import { LeaderboardCard } from '@components/Results'
import { SkeletonGameResults } from '@components/skeletons'
import { StreaksLeaderboard } from '@components/StreaksLeaderboard'
import { StreaksSummaryMap } from '@components/StreaksSummaryMap'
import { Button, FlexGroup } from '@components/system'
import { useAppSelector } from '@redux/hook'
import StyledResultPage from '@styles/ResultPage.Styled'
import { MapType, PageType } from '@types'
import { mailman } from '@utils/helpers'

const ChallengeResultsPage: PageType = () => {
  const [gamesFromChallenge, setGamesFromChallenge] = useState<Game[] | null>()
  const [mapData, setMapData] = useState<MapType>()
  const [selectedGameIndex, setSelectedGameIndex] = useState(0)
  const [notAuthorized, setNotAuthorized] = useState(false)
  const router = useRouter()
  const challengeId = router.query.id as string
  const user = useAppSelector((state) => state.user)

  const fetchGames = async () => {
    const res = await mailman(`scores/challenges/${challengeId}`)

    if (res.notPlayed) {
      return setNotAuthorized(true)
    }

    if (res.error) {
      return setGamesFromChallenge(null)
    }

    setGamesFromChallenge(res.games)

    if (res.games.length > 0 && res.games[0].mode === 'standard') {
      fetchMap(res.games[0].mapId)
    }
  }

  const fetchMap = async (mapId: string) => {
    const res = await mailman(`maps/${mapId}`)
    setMapData(res)
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

  if (notAuthorized) {
    return (
      <StyledResultPage>
        <div className="not-played-wrapper">
          <div className="not-played">
            <h1>You have not played this challenge</h1>
            <p>Finish the challenge to view the results.</p>
            <Link href={`/challenge/${challengeId}`}>
              <a>
                <Button>Play Challenge</Button>
              </a>
            </Link>
          </div>
        </div>
      </StyledResultPage>
    )
  }

  if (gamesFromChallenge === null) {
    return <NotFound message="This challenge does not exist or has not been played yet." />
  }

  if (gamesFromChallenge?.[0].mode === 'streak') {
    return (
      <StyledResultPage>
        <Meta title="Challenge Results" />

        {!gamesFromChallenge ? (
          <SkeletonGameResults />
        ) : (
          <section>
            <Navbar />

            <StreaksSummaryMap gameData={gamesFromChallenge[selectedGameIndex]} />

            <FlexGroup justify="center">
              <StreaksLeaderboard
                gameData={gamesFromChallenge}
                selectedGameIndex={selectedGameIndex}
                setSelectedGameIndex={setSelectedGameIndex}
              />
            </FlexGroup>
          </section>
        )}
      </StyledResultPage>
    )
  }

  return (
    <StyledResultPage>
      <Meta title="Challenge Results" />

      {!gamesFromChallenge || !mapData ? (
        <SkeletonGameResults />
      ) : (
        <section>
          <Navbar />

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
        </section>
      )}
    </StyledResultPage>
  )
}

ChallengeResultsPage.noLayout = true

export default ChallengeResultsPage
