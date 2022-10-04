import Link from 'next/link'
import React, { FC } from 'react'

import { Avatar, FlexGroup, Icon } from '@components/System'
import { ChartBarIcon } from '@heroicons/react/outline'
import user from '@redux/user'
import { GameType, MapLeaderboardType } from '@types'
import { formatMonthDayYearTime } from '@utils/dateHelpers'
import {
  formatLargeNumber,
  formatRoundTime,
  getFormattedDate
} from '@utils/helperFunctions'

import { StyledWinnerItem } from './'

type Props = {
  winner: MapLeaderboardType
}

const WinnerItem: FC<Props> = ({ winner }) => {
  return (
    <StyledWinnerItem>
      <div className="userSection">
        <span className="userPlace">{getFormattedDate(winner.createdAt)}</span>
        <div className="userInfo">
          <Avatar type="user" src={winner.userAvatar.emoji} backgroundColor={winner.userAvatar.color} />

          <Link href={`/user/${winner.userId}`}>
            <a>
              <span className="username">{winner.userName}</span>
            </a>
          </Link>
        </div>
      </div>

      <div className="resultsSection">
        <span className="totalPoints">{formatLargeNumber(winner.totalPoints)} points</span>
        <FlexGroup gap={5}>
          {winner.totalTime && <span className="totalTime">{formatRoundTime(winner.totalTime)}</span>}

          {
            <Link href={`/results/${winner.gameId}`}>
              <a>
                <Icon size={20} fill="#fff">
                  <ChartBarIcon />
                </Icon>
              </a>
            </Link>
          }
        </FlexGroup>
      </div>
    </StyledWinnerItem>
  )
}

export default WinnerItem
