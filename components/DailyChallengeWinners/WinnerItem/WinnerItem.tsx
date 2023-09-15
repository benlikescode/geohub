import Link from 'next/link'
import { FC } from 'react'
import { Avatar } from '@components/system'
import { MapLeaderboardType } from '@types'
import { formatLargeNumber, formatMonthDay } from '@utils/helpers'
import { StyledWinnerItem } from './'

type Props = {
  winner: MapLeaderboardType
}

const WinnerItem: FC<Props> = ({ winner }) => {
  const challengeDay = winner.createdAt as any

  return (
    <StyledWinnerItem>
      <div className="challenge-day">{formatMonthDay(challengeDay)}</div>

      <div className="winner-info">
        <div className="user-info">
          <Avatar type="user" src={winner.userAvatar.emoji} backgroundColor={winner.userAvatar.color} size={26} />

          <Link href={`/user/${winner.userId}`}>
            <a className="username-wrapper">
              <span className="username">{winner.userName}</span>
            </a>
          </Link>
        </div>

        <span className="total-points">{formatLargeNumber(winner.totalPoints || 0)} points</span>
      </div>
    </StyledWinnerItem>
  )
}

export default WinnerItem
