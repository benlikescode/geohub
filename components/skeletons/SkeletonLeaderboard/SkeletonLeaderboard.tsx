import { FC } from 'react'
import { Skeleton } from '@components/system'
import { StyledSkeletonLeaderboard } from './'

type Props = {
  numRows?: number
  removeHeader?: boolean
}

const SkeletonLeaderboard: FC<Props> = ({ numRows, removeHeader }) => {
  return (
    <StyledSkeletonLeaderboard>
      {!removeHeader && (
        <div className="leaderboardTop">
          <Skeleton height={20} width={150} noBorder />
        </div>
      )}

      {Array.from({ length: numRows || 5 }).map((_, idx) => (
        <div className="skeleton-user-item" key={idx}>
          <div className="skeleton-user-details">
            <Skeleton height={16} width={24} noBorder />
            <div style={{ marginLeft: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Skeleton variant="circular" height={30} width={30} />
              <Skeleton className="skeleton-user-name" height={16} width={100} noBorder />
            </div>
          </div>
          <div className="skeleton-user-created-date">
            <Skeleton className="skeleton-total-points" height={16} width={120} noBorder />
            <Skeleton className="skeleton-total-time" height={16} width={60} noBorder />
            <Skeleton height={16} width={16} noBorder />
          </div>
        </div>
      ))}
    </StyledSkeletonLeaderboard>
  )
}

export default SkeletonLeaderboard
