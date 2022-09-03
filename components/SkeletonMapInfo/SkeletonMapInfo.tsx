import React, { FC } from 'react'
import { StyledSkeletonMapInfo } from '.'
import { Skeleton } from '@components/System/Skeleton'

type Props = {}

const SkeletonMapInfo: FC<Props> = ({}) => {
  return (
    <StyledSkeletonMapInfo>
      <div className="mapDescriptionWrapper">
        <div className="mapAvatar">
          <Skeleton variant="circular" height={100} width={100} />
        </div>

        <div className="descriptionColumnWrapper">
          <div className="descriptionColumn">
            <Skeleton height={24} width={150} noBorder />
            <Skeleton height={16} width={450} noBorder />
          </div>
          <Skeleton height={40} width={200} />
        </div>
      </div>
    </StyledSkeletonMapInfo>
  )
}

export default SkeletonMapInfo
