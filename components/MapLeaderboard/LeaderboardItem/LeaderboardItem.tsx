import { ChartBarIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import React, { FC } from 'react'
import { StyledLeaderboardItem } from '.'
import { UserType } from '../../../types'
import { Avatar, FlexGroup, Icon } from '../../System'

type Props = {
  user: UserType
  finishPlace: number
  totalPoints: number
  totalTime: number
  gameId: string
}

const LeaderboardItem: FC<Props> = ({ user, finishPlace, totalPoints, totalTime, gameId }) => {
  return (
    <StyledLeaderboardItem>
      <div className="userSection">
        <span className="userPlace">#{finishPlace}</span>
        <div className="userInfo">
          <Avatar url={user.avatar} alt='' size={30}/>
          <span className="username">{user.name}</span>
        </div>
      </div>

      <div className="resultsSection">
        <span className="totalPoints">{totalPoints} points</span>
        <FlexGroup gap={10}>
          <span className="totalTime">{totalTime} min</span>
          <Link href={`/results/${gameId}`}>
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
