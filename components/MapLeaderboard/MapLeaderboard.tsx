import { FC } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Spinner } from '@components/system'
import { MapLeaderboardType, UserGameHistoryType } from '@types'
import { useBreakpoint } from '../../utils/hooks/'
import { StyledMapLeaderboard } from './'
import { LeaderboardItem } from './LeaderboardItem'

type Props = {
  removeHeader?: boolean
  removeResults?: boolean
  title?: string
  leaderboard: MapLeaderboardType[] | UserGameHistoryType[]
  noResultsMessage?: string
  infiniteScrollCallback?: () => void
  hasMore?: boolean
}

const MapLeaderboard: FC<Props> = ({
  removeHeader,
  removeResults,
  title,
  leaderboard,
  noResultsMessage,
  infiniteScrollCallback,
  hasMore,
}) => {
  const { isBreakpoint } = useBreakpoint()

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
          key={isBreakpoint ? 1 : 0}
          scrollableTarget={isBreakpoint ? undefined : 'main'}
        >
          {leaderboard.map((row, idx) => (
            <LeaderboardItem key={idx} finishPlace={idx + 1} row={row} />
          ))}
        </InfiniteScroll>
      )}

      {!infiniteScrollCallback &&
        leaderboard.length > 0 &&
        leaderboard.map((row, idx) => (
          <LeaderboardItem key={idx} finishPlace={idx + 1} row={row} removeResults={removeResults} />
        ))}

      {leaderboard.length <= 0 && (
        <span className="notPlayedMsg">
          {noResultsMessage ?? 'This map has not been played yet. Be the first one on the leaderboard!'}
        </span>
      )}
    </StyledMapLeaderboard>
  )
}

export default MapLeaderboard
