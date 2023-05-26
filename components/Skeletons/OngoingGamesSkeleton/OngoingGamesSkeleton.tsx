import { FC } from 'react'
import { Skeleton } from '@components/System/Skeleton'
import { StyledOngoingGamesSkeleton } from './'

type Props = {}

const OngoingGamesSkeleton: FC<Props> = ({}) => {
  return (
    <StyledOngoingGamesSkeleton>
      {Array.from({ length: 15 }).map((_, idx) => (
        <div key={idx} className={`ongoing-item ${idx % 2 === 0 ? 'variant' : ''}`}>
          <div className="flex-left">
            <div className="map-details">
              <Skeleton variant="circular" height={32} width={32} />
              <Skeleton className="map-name" height={16} width={150} noBorder />
            </div>
          </div>

          <div className="flex-right">
            <div className="game-info-pills">
              <Skeleton className="round-pill" height={30} width={80} />
              <Skeleton className="score-pill" height={30} width={80} />
              <Skeleton className="created-pill" height={30} width={120} />
            </div>

            <div className="ongoing-buttons">
              <Skeleton height={40} width={40} />
              <Skeleton height={40} width={40} />
            </div>
          </div>
        </div>
      ))}
    </StyledOngoingGamesSkeleton>
  )
}

export default OngoingGamesSkeleton
