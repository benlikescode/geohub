import React, { FC } from 'react'

import {
  GlobeIcon,
  LocationMarkerIcon,
  ScaleIcon,
  UserIcon
} from '@heroicons/react/outline'
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

        <div className="textWrapper">
          <span className="mainLabel">Average Streak</span>
          <span className="subLabel">{formatLargeNumber(streakStats.avgStreak || 0)}</span>
        </div>
      </div>

      <div className="stat-item">
        <div className="stat-icon">
          <UserIcon />
        </div>

        <div className="textWrapper">
          <span className="mainLabel">Explorers</span>
          <span className="subLabel">{streakStats.usersPlayed}</span>
        </div>
      </div>

      <div className="stat-item">
        <div className="stat-icon">
          <LocationMarkerIcon />
        </div>

        <div className="textWrapper">
          <span className="mainLabel">Locations</span>
          <span className="subLabel">{formatLargeNumber(streakStats.locationCount)}</span>
        </div>
      </div>

      <div className="stat-item">
        <div className="stat-icon">
          <GlobeIcon />
        </div>

        <div className="textWrapper">
          <span className="mainLabel">Countries</span>
          <span className="subLabel">{formatLargeNumber(streakStats.countryCount)}</span>
        </div>
      </div>
    </StyledStreakMapStats>
  )
}

export default StreakMapStats
