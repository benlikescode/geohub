import { FC } from 'react'
import { GlobeIcon, LocationMarkerIcon, ScaleIcon, UserIcon } from '@heroicons/react/outline'
import { DailyChallengeStatsType } from '@types'
import { formatLargeNumber } from '@utils/helpers'
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

        <div className="textWrapper">
          <span className="mainLabel">Average Score</span>
          <span className="subLabel">{formatLargeNumber(dailyChallengeStats.avgScore || 0)}</span>
        </div>
      </div>

      <div className="stat-item">
        <div className="stat-icon">
          <UserIcon />
        </div>

        <div className="textWrapper">
          <span className="mainLabel">Explorers</span>
          <span className="subLabel">{dailyChallengeStats.usersPlayed}</span>
        </div>
      </div>

      <div className="stat-item">
        <div className="stat-icon">
          <LocationMarkerIcon />
        </div>

        <div className="textWrapper">
          <span className="mainLabel">Locations</span>
          <span className="subLabel">{formatLargeNumber(dailyChallengeStats.locationCount)}</span>
        </div>
      </div>

      <div className="stat-item">
        <div className="stat-icon">
          <GlobeIcon />
        </div>

        <div className="textWrapper">
          <span className="mainLabel">Countries</span>
          <span className="subLabel">{dailyChallengeStats.countryCount}</span>
        </div>
      </div>
    </StyledDailyChallengeMapStats>
  )
}

export default DailyChallengeMapStats
