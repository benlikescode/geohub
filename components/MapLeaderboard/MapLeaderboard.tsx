import { FC, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Spinner } from '@components/System'
import { MapLeaderboardType } from '@types'
import { useIsMobile } from '../../utils/helpers/useIsMobile'
import { StyledMapLeaderboard } from './'
import { LeaderboardItem } from './LeaderboardItem'

type Props = {
  removeHeader?: boolean
  title?: string
  leaderboard: MapLeaderboardType[]
  noResultsMessage?: string
  infiniteScrollCallback?: () => void
  hasMore?: boolean
}

const MapLeaderboard: FC<Props> = ({
  removeHeader,
  title,
  leaderboard,
  noResultsMessage,
  infiniteScrollCallback,
  hasMore,
}) => {
  const { isMobile } = useIsMobile()

  return (
    <StyledMapLeaderboard>
      {!removeHeader && (
        <div className="leaderboardTop">
          <span className="title">{title ?? 'Leaderboard'}</span>
        </div>
      )}
      {infiniteScrollCallback && leaderboard.length > 0 && (
        <InfiniteScroll
          dataLength={leaderboard.length}
          next={() => infiniteScrollCallback()}
          hasMore={hasMore || false}
          loader={
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                padding: '1rem',
              }}
            >
              <Spinner size={24} />
            </div>
          }
          key={isMobile ? 1 : 0}
          scrollableTarget={isMobile ? undefined : 'main'}
        >
          {leaderboard.map((row, idx) => (
            <LeaderboardItem key={idx} finishPlace={idx + 1} row={row} />
          ))}
        </InfiniteScroll>
      )}

      {!infiniteScrollCallback &&
        leaderboard.length > 0 &&
        leaderboard.map((row, idx) => <LeaderboardItem key={idx} finishPlace={idx + 1} row={row} />)}

      {leaderboard.length <= 0 && (
        <span className="notPlayedMsg">
          {noResultsMessage ?? 'This map has not been played yet. Be the first one on the leaderboard!'}
        </span>
      )}
    </StyledMapLeaderboard>
  )
}

export default MapLeaderboard
