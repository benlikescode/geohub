import React, { FC } from 'react'
import { StyledSkeletonCards } from '.'
import { Skeleton } from '../System/Skeleton'

type Props = {
  numCards?: number
}

const SkeletonCards: FC<Props> = ({ numCards }) => {
  return (
    <StyledSkeletonCards>
      {Array(numCards || 4)
        .fill(0)
        .map((_, idx) => (
          <div key={idx} className="skeleton-card-item">
            <Skeleton variant="rectangular" height={120} width={300} noBorder />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Skeleton height={20} width={220} noBorder />
              <Skeleton height={20} width={220} noBorder />
            </div>

            <Skeleton height={40} width={180} />
          </div>
        ))}
    </StyledSkeletonCards>
  )
}

export default SkeletonCards
