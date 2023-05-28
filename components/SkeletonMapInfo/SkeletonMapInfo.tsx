import { FC } from 'react'
import { Skeleton } from '@components/System/Skeleton'
import { StyledSkeletonMapInfo } from './'

const SkeletonMapInfo: FC = () => {
  return (
    <StyledSkeletonMapInfo>
      <div className="map-details-section">
        <div className="map-description-wrapper">
          <div className="description-column-wrapper">
            <div className="description-column">
              <Skeleton variant="rectangular" height={52} width={52} />
              <div className="map-details">
                <Skeleton height={24} width={80} noBorder />
                <Skeleton height={16} width={200} noBorder />
              </div>
            </div>
            <Skeleton height={52} width={148} />
          </div>
        </div>

        <div className="stats-grid">
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
