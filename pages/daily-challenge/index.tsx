import router from 'next/router'
import { FC, useEffect, useState } from 'react'
import { mailman } from '@backend/utils/mailman'
import { DailyChallengeMapStats } from '@components/DailyChallengeMapStats'
import { DailyChallengeWinners } from '@components/DailyChallengeWinners'
import { Head } from '@components/Head'
import { WidthController } from '@components/layout'
import { MapLeaderboard } from '@components/MapLeaderboard'
import { SkeletonLeaderboard, SkeletonMapInfo } from '@components/skeletons'
import { Avatar, Button } from '@components/system'
import { VerifiedBadge } from '@components/VerifiedBadge'
import { CheckIcon } from '@heroicons/react/outline'
import { useAppSelector } from '@redux/hook'
import StyledDailyChallengePage from '@styles/DailyChallengePage.Styled'
import { DailyChallengeStatsType, MapLeaderboardType } from '@types'
import { DAILY_CHALLENGE_DETAILS } from '@utils/constants/random'
import { showErrorToast } from '@utils/helpers'

const DailyChallengePage: FC = () => {
  const [mapStats, setMapStats] = useState<DailyChallengeStatsType | null>()
  const [allTimeScores, setAllTimeScores] = useState<MapLeaderboardType[] | null>()
  const [todayScores, setTodayScores] = useState<MapLeaderboardType[] | null>()
  const [usersGameState, setUsersGameState] = useState<'started' | 'finished' | 'notStarted'>('notStarted')
  const [previousWinners, setPreviousWinners] = useState([])
  const [challengeId, setChallengeId] = useState()

  const user = useAppSelector((state) => state.user)

  useEffect(() => {
    fetchDailyChallenge()
    fetchMapScores()
    fetchPreviousWinners()
  }, [])

  const fetchDailyChallenge = async () => {
    const res = await mailman(`challenges/daily`)

    if (res.error) {
      return showErrorToast(res.error.message)
    }

    setMapStats(res.stats)
    setUsersGameState(res.usersGameState)
    setChallengeId(res.challengeId)
  }

  const fetchMapScores = async () => {
    const res = await mailman(`scores/challenges/daily/leaderboard`)

    if (res.error) {
      return showErrorToast(res.error.message)
    }

    setAllTimeScores(res.allTime)
    setTodayScores(res.today)
  }

  const fetchPreviousWinners = async () => {
    const res = await mailman(`scores/challenges/daily/previous`)

    if (res.error) {
      return showErrorToast(res.error.message)
    }

    setPreviousWinners(res)
  }

  const startDailyChallenge = async () => {
    if (!user.id) {
      return router.push('/register')
    }

    router.push(usersGameState === 'finished' ? `/results/challenge/${challengeId}` : `/challenge/${challengeId}`)
  }

  return (
    <StyledDailyChallengePage>
      <WidthController customWidth="1400px" mobilePadding="0px">
        <Head title={`Play - ${DAILY_CHALLENGE_DETAILS.name}`} />

        <div className="daily-challenge-wrapper">
          <div>
            {mapStats && challengeId ? (
              <div className="mapDetailsSection">
                <div className="mapDescriptionWrapper">
                  <div className="descriptionColumnWrapper">
                    <div className="descriptionColumn">
                      <Avatar type="map" src={DAILY_CHALLENGE_DETAILS.previewImg} size={50} />
                      <div className="map-details">
                        <div className="name-container">
                          <div className="name-wrapper">
                            <span className="name">{DAILY_CHALLENGE_DETAILS.name}</span>
                          </div>
                          <VerifiedBadge size={20} />
                        </div>

                        <span className="description">{DAILY_CHALLENGE_DETAILS.description}</span>
                      </div>
                    </div>

                    <Button width="148px" height="52px" style={{ padding: 0 }} onClick={() => startDailyChallenge()}>
                      {usersGameState === 'started' && 'Continue'}
                      {usersGameState === 'notStarted' && 'Play Now'}
                      {usersGameState === 'finished' && (
                        <div className="completed-wrapper">
                          <div className="completed-check">
                            <CheckIcon />
                          </div>
                          <div className="completed-text">View Results</div>
                        </div>
                      )}
                    </Button>
                  </div>
                </div>

                <div className="statsWrapper">
                  <DailyChallengeMapStats dailyChallengeStats={mapStats} />
                </div>
              </div>
            ) : (
              <SkeletonMapInfo />
            )}

            {allTimeScores && todayScores ? (
              <div className="leaderboards-wrapper">
                <MapLeaderboard
                  leaderboard={todayScores}
                  title="Today's Leaderboard"
                  noResultsMessage="Play now to be the first on the leaderboard!"
                  removeResults={usersGameState !== 'finished'}
                />

                <MapLeaderboard
                  leaderboard={allTimeScores}
                  title="All Time Leaderboard"
                  removeResults={usersGameState !== 'finished'}
                />
              </div>
            ) : (
              <SkeletonLeaderboard />
            )}
          </div>

          <div className="previous-winners-container">
            {previousWinners ? <DailyChallengeWinners prevWinners={previousWinners} /> : <SkeletonLeaderboard />}
          </div>
        </div>
      </WidthController>
    </StyledDailyChallengePage>
  )
}

export default DailyChallengePage
