import { DateTime } from 'luxon'
import Link from 'next/link'
import { FC } from 'react'
import { Avatar } from '@components/System'
import { MapLeaderboardType } from '@types'
import { formatLargeNumber } from '@utils/helperFunctions'
import { StyledWinnerItem } from './'

type Props = {
  winner: MapLeaderboardType
}

const WinnerItem: FC<Props> = ({ winner }) => {
  const challengeDay = winner.createdAt as any

  return (
    <StyledWinnerItem>
      <div className="challenge-day">{challengeDay && DateTime.fromISO(challengeDay).toFormat('LLL dd')}</div>

      <div className="winner-info">
        <div className="user-info">
          <Avatar type="user" src={winner.userAvatar.emoji} backgroundColor={winner.userAvatar.color} size={26} />

          <Link href={`/user/${winner.userId}`}>
            <a>
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
