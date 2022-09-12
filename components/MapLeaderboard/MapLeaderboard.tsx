import { FC, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { Spinner } from '@components/System'
import { Select } from '@components/System/Select'
import { MapLeaderboardType } from '@types'

import { StyledMapLeaderboard } from './'
import { LeaderboardItem } from './LeaderboardItem'

type Props = {
  removeHeader?: boolean
  leaderboard: MapLeaderboardType[]
  infiniteScrollCallback?: () => void
  hasMore?: boolean
}

const MapLeaderboard: FC<Props> = ({ removeHeader, leaderboard, infiniteScrollCallback, hasMore }) => {
  const [selectState, setSelectState] = useState()
  const selectOptions = ['Filter by', 'Top', 'Friends']

  return (
    <StyledMapLeaderboard>
      {!removeHeader && (
        <div className="leaderboardTop">
          <span className="title">Leaderboard</span>
          <Select options={selectOptions} callback={setSelectState} />
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
        <span className="notPlayedMsg">This map has not been played yet. Be the first one on the leaderboard!</span>
      )}
    </StyledMapLeaderboard>
  )
}

export default MapLeaderboard
