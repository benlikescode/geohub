import React, { useEffect, useState } from 'react'
import { mailman } from '@backend/utils/mailman'
import { Head } from '@components/Head'
import { WidthController } from '@components/Layout/WidthController'
import { MapLeaderboard } from '@components/MapLeaderboard'
import { GameSettingsModal } from '@components/Modals'
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

  // https://fy.vnmod.net/wp-content/uploads/2022/11/191120221668845754.png
  // https://media.istockphoto.com/id/184616827/vector/heart-puzzle-with-flags.jpg?s=612x612&w=0&k=20&c=RxXpiGT2uqkatjAtEA40H7o8-QwAuiixtjXCzLLmR7E=

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
                    <div className="name-wrapper">
                      <span className="name">{COUNTRY_STREAK_DETAILS.name}</span>
                      <VerifiedBadge size={20} />
                    </div>
                    <span className="description">{COUNTRY_STREAK_DETAILS.description}</span>
                  </div>
                </div>
                <Button width="148px" height="52px" onClick={() => setSettingsModalOpen(true)}>
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
