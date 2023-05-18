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
          <div className="leaderboardWrapper">
            <div className="gameInfoWrapper">
              {Array.from({ length: 2 }).map((_, idx) => (
                <div key={idx} className="gameInfoItem">
                  <Skeleton variant="circular" height={50} width={50} />

                  <div className="gameInfoContent">
                    <Skeleton variant="rectangular" height={20} width={100} noBorder />
                    <Skeleton variant="rectangular" height={16} width={120} noBorder />
                  </div>
                </div>
              ))}
            </div>

            <div className="leaderboardSection">
              <div className="leaderboardHeaderRow">
                <div className="titleSection">
                  <Skeleton variant="rectangular" height={14} width={120} noBorder />
                </div>

                {Array.from({ length: 5 }).map((_, idx) => (
                  <div key={idx} className="titleSection hideOnSmall">
                    <Skeleton variant="rectangular" height={14} width={80} noBorder />
                  </div>
                ))}

                <div className="titleSection">
                  <Skeleton variant="rectangular" height={14} width={80} noBorder />
                </div>
              </div>

              {Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="leaderboardRow">
                  <div className="userSection">
                    {isChallenge && <Skeleton variant="rectangular" height={14} width={30} noBorder />}
                    <div className="userInfo">
                      <Skeleton variant="circular" height={32} width={32} />
                      <Skeleton variant="rectangular" height={16} width={100} noBorder />
                    </div>
                  </div>

                  {Array.from({ length: 5 }).map((_, idx) => (
                    <div key={idx} className="userResultSection hideOnSmall">
                      <div className="pointsWrapper">
                        <Skeleton variant="rectangular" height={16} width={50} noBorder />
                      </div>
                      <div className="distanceTimeWrapper">
                        <Skeleton variant="rectangular" height={14} width={100} noBorder />
                      </div>
                    </div>
                  ))}

                  <div key={idx} className="userResultSection">
                    <div className="pointsWrapper">
                      <Skeleton variant="rectangular" height={16} width={50} noBorder />
                    </div>
                    <div className="distanceTimeWrapper">
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
