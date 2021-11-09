import { ChartBarIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import React, { FC } from 'react'
import { StyledLeaderboardItem } from '.'
import { MapLeaderboardType, UserType } from '../../../types'
import { formatRoundTime } from '../../../utils/helperFunctions'
import { Avatar, FlexGroup, Icon } from '../../System'

type Props = {
  finishPlace: number
  row: MapLeaderboardType
}

const LeaderboardItem: FC<Props> = ({ finishPlace, row }) => {
  return (
    <StyledLeaderboardItem>
      <div className="userSection">
        <span className="userPlace">#{finishPlace}</span>
        <div className="userInfo">
          <Avatar url={row.userAvatar} alt='' size={30}/>
          <Link href={`/user/${row.userId}`}>
            <a><span className="username">{row.userName}</span></a>
          </Link>
        </div>
      </div>

      <div className="resultsSection">
        <span className="totalPoints">{row.totalPoints} points</span>
        <FlexGroup gap={10}>
          <span className="totalTime">{formatRoundTime(row.totalTime)}</span>
          <Link href={`/results/${row.gameId}`}>
            <a>
              <Icon size={20} fill="#fff">
                <ChartBarIcon />
              </Icon>
            </a>
          </Link>
        </FlexGroup>
      </div>
    </StyledLeaderboardItem>
  )
}

export default LeaderboardItem
