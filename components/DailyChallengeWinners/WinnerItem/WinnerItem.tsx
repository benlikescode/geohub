import Link from 'next/link'
import { FC } from 'react'
import { Avatar, FlexGroup } from '@components/system'
import { MapLeaderboardType } from '@types'
import { formatMonthDay } from '@utils/dateHelpers'
import { formatLargeNumber } from '@utils/helpers'
import { StyledWinnerItem } from './'
import { ChartBarIcon } from '@heroicons/react/outline'

type Props = {
  winner: MapLeaderboardType
}

const WinnerItem: FC<Props> = ({ winner }) => {
  const challengeDay = winner.createdAt as any

  return (
    <StyledWinnerItem>
      <div className="user-wrapper">
        <div className="user-info">
          <Avatar type="user" src={winner.userAvatar.emoji} backgroundColor={winner.userAvatar.color} />

          <Link href={`/user/${winner.userId}`}>
            <a className="username-wrapper">
              <span className="username">{winner.userName}</span>
            </a>
          </Link>
        </div>
      </div>

      <div className="winner-info">
        <span className="total-points">{formatLargeNumber(winner.totalPoints || 0)} points</span>

        <FlexGroup gap={5}>
          <div className="challenge-day">{formatMonthDay(challengeDay)}</div>

          <Link href={`/challenge/${winner._id}`}>
            <a className="results-link">
              <ChartBarIcon />
            </a>
          </Link>
        </FlexGroup>
      </div>
    </StyledWinnerItem>
  )
}

export default WinnerItem
