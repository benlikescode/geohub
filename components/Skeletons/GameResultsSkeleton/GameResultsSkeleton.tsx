import { FC } from 'react'
import { Skeleton } from '@components/System/Skeleton'
import { StyledGameResultsSkeleton } from './'

type Props = {
  isChallenge?: boolean
}

const GameResultsSkeleton: FC<Props> = ({ isChallenge }) => {
  return (
    <StyledGameResultsSkeleton>
      <div className="map-skeleton"></div>

      <div className="leaderboard-card-wrapper">
        <div className="leaderboard-card">
          <div className="leaderboard-wrapper">
            <div className="game-info-wrapper">
              {Array.from({ length: 2 }).map((_, idx) => (
                <div key={idx} className="game-info-item">
                  <Skeleton variant="circular" height={50} width={50} />

                  <div className="game-info-content">
                    <Skeleton className="label1" variant="rectangular" height={18} width={100} noBorder />
                    <Skeleton className="label2" variant="rectangular" height={16} width={120} noBorder />
                  </div>
                </div>
              ))}
            </div>

            <div className="leaderboard-section">
              <div className="leaderboard-header-row">
                <div className="title-section">
                  <Skeleton variant="rectangular" height={14} width={120} noBorder />
                </div>

                {Array.from({ length: 5 }).map((_, idx) => (
                  <div key={idx} className="title-section hide-on-small">
                    <Skeleton variant="rectangular" height={14} width={80} noBorder />
                  </div>
                ))}

                <div className="title-section">
                  <Skeleton variant="rectangular" height={14} width={80} noBorder />
                </div>
              </div>

              {Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="leaderboard-row">
                  <div className="user-section">
                    {isChallenge && <Skeleton variant="rectangular" height={14} width={30} noBorder />}
                    <div className="user-info">
                      <Skeleton variant="circular" height={32} width={32} />
                      <Skeleton variant="rectangular" height={16} width={100} noBorder />
                    </div>
                  </div>

                  {Array.from({ length: 5 }).map((_, idx) => (
                    <div key={idx} className="user-result-section hide-on-small">
                      <div className="points-wrapper">
                        <Skeleton variant="rectangular" height={16} width={50} noBorder />
                      </div>
                      <div className="distance-time-wrapper">
                        <Skeleton variant="rectangular" height={14} width={100} noBorder />
                      </div>
                    </div>
                  ))}

                  <div key={idx} className="user-result-section">
                    <div className="points-wrapper">
                      <Skeleton variant="rectangular" height={16} width={50} noBorder />
                    </div>
                    <div className="distance-time-wrapper">
                      <Skeleton variant="rectangular" height={14} width={100} noBorder />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </StyledGameResultsSkeleton>
  )
}

export default GameResultsSkeleton
