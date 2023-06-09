import { FC } from 'react'
import { Skeleton } from '@components/system'
import { StyledSkeletonMapInfo } from './'

type Props = {}

const SkeletonMapInfo: FC<Props> = ({}) => {
  return (
    <StyledSkeletonMapInfo>
      <div className="mapDetailsSection">
        <div className="mapDescriptionWrapper">
          <div className="descriptionColumnWrapper">
            <div className="descriptionColumn">
              <Skeleton variant="rectangular" height={52} width={52} />
              <div className="map-details">
                <Skeleton height={24} width={80} noBorder />
                <Skeleton height={16} width={200} noBorder />
              </div>
            </div>
            <Skeleton height={52} width={148} />
          </div>
        </div>

        <div className="statsGrid">
          <Skeleton height={65} />
          <Skeleton height={65} />
          <Skeleton height={65} />
          <Skeleton height={65} />
        </div>
      </div>
    </StyledSkeletonMapInfo>
  )
}

export default SkeletonMapInfo
