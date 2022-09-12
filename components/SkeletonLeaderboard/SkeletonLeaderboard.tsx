import React, { FC } from 'react'

import { Skeleton } from '@components/System/Skeleton'

import { StyledSkeletonLeaderboard } from './'

type Props = {
  numRows?: number
}

const SkeletonLeaderboard: FC<Props> = ({ numRows }) => {
  return (
    <StyledSkeletonLeaderboard>
      <div className="leaderboardTop">
        <Skeleton height={25} width={150} noBorder />
        <Skeleton height={36} width={150} />
      </div>

      {Array.from({ length: numRows || 5 }).map((_, idx) => (
        <div className="skeleton-user-item" key={idx}>
          <div className="skeleton-user-details">
            <Skeleton height={16} width={24} noBorder />
            <div style={{ marginLeft: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Skeleton variant="circular" height={30} width={30} />
              <Skeleton height={16} width={100} noBorder />
            </div>
          </div>
          <div className="skeleton-user-created-date">
            <Skeleton height={16} width={120} noBorder />
            <Skeleton height={16} width={80} noBorder />
            <Skeleton height={16} width={16} noBorder />
          </div>
        </div>
      ))}
    </StyledSkeletonLeaderboard>
  )
}

export default SkeletonLeaderboard
