import React, { FC } from 'react'
import { StyledSkeletonLeaderboard } from '.'
import { Skeleton } from '../System/Skeleton'

type Props = {}

const SkeletonLeaderboard: FC<Props> = ({}) => {
  return (
    <StyledSkeletonLeaderboard>
      <div className="leaderboardTop">
        <Skeleton height={25} width={150} noBorder />
        <Skeleton height={36} width={150} />
      </div>

      {Array(5)
        .fill(0)
        .map((_, idx) => (
          <div className="skeleton-user-item" key={idx}>
            <div className="skeleton-user-details">
              <Skeleton key={idx} height={16} width={24} noBorder />
              <div style={{ marginLeft: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Skeleton key={idx} variant="circular" height={30} width={30} />
                <Skeleton key={idx} height={16} width={100} noBorder />
              </div>
            </div>
            <div className="skeleton-user-created-date">
              <Skeleton key={idx} height={16} width={120} noBorder />
              <Skeleton key={idx} height={16} width={80} noBorder />
              <Skeleton key={idx} height={16} width={16} noBorder />
            </div>
          </div>
        ))}
    </StyledSkeletonLeaderboard>
  )
}

export default SkeletonLeaderboard
