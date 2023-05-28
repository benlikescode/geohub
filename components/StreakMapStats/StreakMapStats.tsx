import { FC } from 'react'
import { GlobeIcon, LocationMarkerIcon, ScaleIcon, UserIcon } from '@heroicons/react/outline'
import { StreakStatsType } from '@types'
import { formatLargeNumber } from '@utils/helperFunctions'
import { StyledStreakMapStats } from './'

type Props = {
  streakStats: StreakStatsType
}

const StreakMapStats: FC<Props> = ({ streakStats }) => {
  return (
    <StyledStreakMapStats>
      <div className="stat-item">
        <div className="stat-icon">
          <ScaleIcon />
        </div>

        <div className="text-wrapper">
          <span className="main-label">Average Streak</span>
          <span className="sub-label">{formatLargeNumber(streakStats.avgStreak || 0)}</span>
        </div>
      </div>

      <div className="stat-item">
        <div className="stat-icon">
          <UserIcon />
        </div>

        <div className="text-wrapper">
          <span className="main-label">Explorers</span>
          <span className="sub-label">{streakStats.usersPlayed}</span>
        </div>
      </div>

      <div className="stat-item">
        <div className="stat-icon">
          <LocationMarkerIcon />
        </div>

        <div className="text-wrapper">
          <span className="main-label">Locations</span>
          <span className="sub-label">{formatLargeNumber(streakStats.locationCount)}</span>
        </div>
      </div>

      <div className="stat-item">
        <div className="stat-icon">
          <GlobeIcon />
        </div>

        <div className="text-wrapper">
          <span className="main-label">Countries</span>
          <span className="sub-label">{formatLargeNumber(streakStats.countryCount)}</span>
        </div>
      </div>
    </StyledStreakMapStats>
  )
}

export default StreakMapStats
