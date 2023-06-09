import { useEffect, useState } from 'react'
import { mailman } from '@backend/utils/mailman'
import { Head } from '@components/Head'
import { WidthController } from '@components/layout/WidthController'
import { MapLeaderboard } from '@components/MapLeaderboard'
import { GameSettingsModal } from '@components/modals'
import { SkeletonLeaderboard } from '@components/SkeletonLeaderboard'
import { SkeletonMapInfo } from '@components/SkeletonMapInfo'
import { StreakMapStats } from '@components/StreakMapStats'
import { Avatar, Button } from '@components/System'
import { VerifiedBadge } from '@components/VerifiedBadge'
import StyledPlayStreaksPage from '@styles/PlayStreaksPage.Styled'
import { MapLeaderboardType, StreakStatsType } from '@types'
import { COUNTRY_STREAK_DETAILS } from '@utils/constants/random'
import { showErrorToast } from '@utils/helpers/showToasts'

const StreaksPage = () => {
  const [streakStats, setStreakStats] = useState<StreakStatsType>()
  const [settingsModalOpen, setSettingsModalOpen] = useState(false)
  const [leaderboardData, setLeaderboardData] = useState<MapLeaderboardType[] | null>()

  useEffect(() => {
    getStreakStats()
    fetchMapScores()
  }, [])

  const getStreakStats = async () => {
    const res = await mailman('streaks/stats')

    if (res.error) {
      return showErrorToast(res.error.message)
    }

    setStreakStats(res)
  }

  const fetchMapScores = async () => {
    const res = await mailman(`scores/streaks`)

    if (res.error) {
      return setLeaderboardData(null)
    }

    setLeaderboardData(res)
  }

  return (
    <StyledPlayStreaksPage>
      <WidthController customWidth="1100px" mobilePadding="0px">
        <Head title="Country Streaks" />

        {streakStats ? (
          <div className="mapDetailsSection">
            <div className="mapDescriptionWrapper">
              <div className="descriptionColumnWrapper">
                <div className="descriptionColumn">
                  <Avatar type="map" src={COUNTRY_STREAK_DETAILS.previewImg} size={50} />
                  <div className="map-details">
                    <div className="name-container">
                      <div className="name-wrapper">
                        <span className="name">{COUNTRY_STREAK_DETAILS.name}</span>
                      </div>
                      <VerifiedBadge size={20} />
                    </div>
                    <span className="description">{COUNTRY_STREAK_DETAILS.description}</span>
                  </div>
                </div>
                <Button className="mapPlayBtn" width="148px" height="52px" onClick={() => setSettingsModalOpen(true)}>
                  Play Now
                </Button>
                <button className="mapPlayBtn mobile" onClick={() => setSettingsModalOpen(true)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path
                      fillRule="evenodd"
                      d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="statsWrapper">
              <StreakMapStats streakStats={streakStats} />
            </div>
          </div>
        ) : (
          <SkeletonMapInfo />
        )}

        {leaderboardData ? <MapLeaderboard leaderboard={leaderboardData} /> : <SkeletonLeaderboard />}
      </WidthController>

      <GameSettingsModal
        isOpen={settingsModalOpen}
        closeModal={() => setSettingsModalOpen(false)}
        mapDetails={COUNTRY_STREAK_DETAILS}
        gameMode="streak"
      />
    </StyledPlayStreaksPage>
  )
}

export default StreaksPage
