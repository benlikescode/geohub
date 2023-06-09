import { FC } from 'react'
import { SkeletonLeaderboard } from '@components/skeletons'
import { Skeleton } from '@components/system'
import { StyledSkeletonProfile } from './'

type Props = {}

const SkeletonProfile: FC<Props> = ({}) => {
  return (
    <StyledSkeletonProfile>
      <div>
        <Skeleton className="skeleton-banner" height={250} noBorder />

        <div className="skeleton-profile-details">
          <div className="skeleton-profile-heading">
            <div className="skeleton-avatar-wrapper">
              <Skeleton className="skeleton-avatar" variant="circular" height={125} width={125} />
            </div>

            <div className="skeleton-text-wrapper">
              <Skeleton height={20} width={150} noBorder />
              <Skeleton height={16} width={300} noBorder />
            </div>
          </div>

          <SkeletonLeaderboard numRows={20} removeHeader />
        </div>
      </div>
    </StyledSkeletonProfile>
  )
}

export default SkeletonProfile
