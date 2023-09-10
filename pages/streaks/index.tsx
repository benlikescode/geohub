import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Head } from '@components/Head'
import { WidthController } from '@components/layout'
import { MapLeaderboard } from '@components/MapLeaderboard'
import { GameSettingsModal } from '@components/modals'
import { SkeletonLeaderboard, SkeletonMapInfo } from '@components/skeletons'
import { StreakMapStats } from '@components/StreakMapStats'
import { Avatar, Button } from '@components/system'
import { VerifiedBadge } from '@components/VerifiedBadge'
import { useAppSelector } from '@redux/hook'
import StyledPlayStreaksPage from '@styles/PlayStreaksPage.Styled'
import { MapLeaderboardType, StreakStatsType } from '@types'
import { COUNTRY_STREAK_DETAILS } from '@utils/constants/otherGameModeDetails'
import { mailman, showToast } from '@utils/helpers'

const StreaksPage = () => {
  const [streakStats, setStreakStats] = useState<StreakStatsType>()
  const [settingsModalOpen, setSettingsModalOpen] = useState(false)
  const [leaderboardData, setLeaderboardData] = useState<MapLeaderboardType[] | null>()
  const user = useAppSelector((state) => state.user)
  const router = useRouter()

  useEffect(() => {
    getStreakStats()
    fetchMapScores()
  }, [])

  const getStreakStats = async () => {
    const res = await mailman('streaks/stats')

    if (res.error) {
      return showToast('error', res.error.message)
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

  const handleClickPlay = () => {
    if (!user.id) {
      return router.push('/register')
    }

    setSettingsModalOpen(true)
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
                <Button className="play-button" onClick={() => handleClickPlay()}>
                  Play Now
                </Button>
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
