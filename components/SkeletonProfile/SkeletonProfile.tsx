import { FC } from 'react'
import { SkeletonLeaderboard } from '@components/SkeletonLeaderboard'
import { Skeleton } from '@components/System/Skeleton'
import { StyledSkeletonProfile } from './'

type Props = {}

const SkeletonProfile: FC<Props> = ({}) => {
  return (
    <StyledSkeletonProfile>
      <div>
        <Skeleton height={250} />

        <div className="profile-details">
          <div className="profile-heading">
            <div className="profile-avatar">
              <Skeleton variant="circular" height={125} width={125} />
            </div>

            <div className="profile-text-wrapper">
              <Skeleton height={20} width={150} noBorder />
              <Skeleton height={16} width={300} noBorder />
            </div>
          </div>

          <SkeletonLeaderboard numRows={20} />
        </div>
      </div>
    </StyledSkeletonProfile>
  )
}

export default SkeletonProfile
