import React, { FC } from 'react'

import { Skeleton } from '@components/System/Skeleton'

import { StyledOngoingItemSkeleton } from './'

type Props = {}

const OngoingItemSkeleton: FC<Props> = ({}) => {
  return (
    <StyledOngoingItemSkeleton>
      {Array.from({ length: 15 }).map((_, idx) => (
        <div key={idx} className={`ongoing-item ${idx % 2 === 0 ? 'variant' : ''}`}>
          <div className="flex-left">
            <div className="map-details">
              <Skeleton variant="circular" height={32} width={32} />
              <Skeleton height={16} width={175} noBorder />
            </div>
          </div>

          <div className="flex-right">
            <div className="game-info-pills">
              <Skeleton height={30} width={120} />
              <Skeleton height={30} width={120} />
              <Skeleton height={30} width={120} />
            </div>

            <div className="ongoing-buttons">
              <Skeleton height={40} width={40} />
              <Skeleton height={40} width={40} />
            </div>
          </div>
        </div>
      ))}
    </StyledOngoingItemSkeleton>
  )
}

export default OngoingItemSkeleton
