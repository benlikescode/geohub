import { FC } from 'react'
import { GlobeIcon, LocationMarkerIcon, ScaleIcon, UserIcon } from '@heroicons/react/outline'
import { DailyChallengeStatsType } from '@types'
import { formatLargeNumber } from '@utils/helperFunctions'
import { StyledDailyChallengeMapStats } from './'

type Props = {
  dailyChallengeStats: DailyChallengeStatsType
}

const DailyChallengeMapStats: FC<Props> = ({ dailyChallengeStats }) => {
  return (
    <StyledDailyChallengeMapStats>
      <div className="stat-item">
        <div className="stat-icon">
          <ScaleIcon />
        </div>

        <div className="text-wrapper">
          <span className="main-label">Average Score</span>
          <span className="sub-label">{formatLargeNumber(dailyChallengeStats.avgScore || 0)}</span>
        </div>
      </div>

      <div className="stat-item">
        <div className="stat-icon">
          <UserIcon />
        </div>

        <div className="text-wrapper">
          <span className="main-label">Explorers</span>
          <span className="sub-label">{dailyChallengeStats.usersPlayed}</span>
        </div>
      </div>

      <div className="stat-item">
        <div className="stat-icon">
          <LocationMarkerIcon />
        </div>

        <div className="text-wrapper">
          <span className="main-label">Locations</span>
          <span className="sub-label">{formatLargeNumber(dailyChallengeStats.locationCount)}</span>
        </div>
      </div>

      <div className="stat-item">
        <div className="stat-icon">
          <GlobeIcon />
        </div>

        <div className="text-wrapper">
          <span className="main-label">Countries</span>
          <span className="sub-label">{dailyChallengeStats.countryCount}</span>
        </div>
      </div>
    </StyledDailyChallengeMapStats>
  )
}

export default DailyChallengeMapStats
