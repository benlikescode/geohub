import Link from 'next/link'
import { FC } from 'react'
import { Avatar, FlexGroup } from '@components/system'
import { ChartBarIcon } from '@heroicons/react/outline'
import { LightningBoltIcon } from '@heroicons/react/solid'
import { MapLeaderboardType, UserGameHistoryType } from '@types'
import { formatLargeNumber, formatRoundTime } from '@utils/helpers'
import { StyledLeaderboardItem } from './'

type Props = {
  finishPlace: number
  row: MapLeaderboardType | UserGameHistoryType
  removeResults?: boolean
}

const LeaderboardItem: FC<Props> = ({ finishPlace, row, removeResults }) => {
  const LAST_PLACE = 6

  if (typeof row === 'object' && 'mapId' in row) {
    return (
      <StyledLeaderboardItem highlight={false} removeResults={removeResults}>
        <div className="userSection">
          <span className="userPlace">{`#${finishPlace}`}</span>
          <div className="userInfo">
            <Avatar type="map" src={row.mapAvatar} />

            <Link href={`/map/${row.mapId}`}>
              <a className="username-wrapper">
                <span className="username">{row.mapName}</span>
              </a>
            </Link>
          </div>
        </div>

        <div className="resultsSection">
          {typeof row.totalPoints !== 'undefined' && (
            <span className="totalPoints">{formatLargeNumber(row.totalPoints)} points</span>
          )}

          <FlexGroup gap={5}>
            {row.totalTime && <span className="totalTime">{formatRoundTime(row.totalTime)}</span>}

            {!removeResults && (
              <Link href={`/results/${row._id}`}>
                <a className="results-link">
                  <ChartBarIcon />
                </a>
              </Link>
            )}
          </FlexGroup>
        </div>
      </StyledLeaderboardItem>
    )
  }

  return (
    <StyledLeaderboardItem highlight={!!row.highlight} removeResults={removeResults}>
      <div className="userSection">
        <span
          className="userPlace"
          style={{ opacity: finishPlace === LAST_PLACE && row.highlight ? 0 : 1 }}
        >{`#${finishPlace}`}</span>
        <div className="userInfo">
          <Avatar type="user" src={row.userAvatar.emoji} backgroundColor={row.userAvatar.color} />

          <Link href={`/user/${row.userId}`}>
            <a className="username-wrapper">
              <span className="username">{row.userName}</span>
            </a>
          </Link>
        </div>
      </div>

      <div className="resultsSection">
        {typeof row.totalPoints !== 'undefined' && (
          <span className="totalPoints">{formatLargeNumber(row.totalPoints)} points</span>
        )}

        {row.streak && (
          <div className="bestStreakWrapper">
            <LightningBoltIcon />
            <span className="bestStreak">{row.streak}</span>
          </div>
        )}
        <FlexGroup gap={5}>
          {row.totalTime && <span className="totalTime">{formatRoundTime(row.totalTime)}</span>}

          {!removeResults && (
            <Link href={`/results/${row.gameId}`}>
              <a className="results-link">
                <ChartBarIcon />
              </a>
            </Link>
          )}
        </FlexGroup>
      </div>
    </StyledLeaderboardItem>
  )
}

export default LeaderboardItem
