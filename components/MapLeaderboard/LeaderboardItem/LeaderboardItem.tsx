import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC } from 'react'

import { Avatar, FlexGroup, Icon } from '@components/System'
/* eslint-disable @next/next/no-img-element */
import { ChartBarIcon } from '@heroicons/react/outline'
import { LightningBoltIcon } from '@heroicons/react/solid'
import { useAppSelector } from '@redux/hook'
import { MapLeaderboardType } from '@types'
import { formatLargeNumber, formatRoundTime } from '@utils/helperFunctions'

import { StyledLeaderboardItem } from './'

type Props = {
  finishPlace: number
  row: MapLeaderboardType
}

const LeaderboardItem: FC<Props> = ({ finishPlace, row }) => {
  const isAerialLeaderboard = row.difficulty
  const router = useRouter()
  const user = useAppSelector((state) => state.user)

  const LAST_PLACE = 6

  // If we are on the profile page of this user, show their avatar in redux
  // this allows it to update immediately after editing profile
  const isProfilePage = router.asPath.includes('user')
  const isThisUsersProfile = router.query?.id === user.id

  return (
    <StyledLeaderboardItem highlight={!!row.highlight}>
      <div className="userSection">
        <span className="userPlace">{finishPlace === LAST_PLACE && row.highlight ? '' : `#${finishPlace}`}</span>
        <div className="userInfo">
          {isProfilePage && isThisUsersProfile ? (
            <Avatar type="user" src={user.avatar.emoji} backgroundColor={user.avatar.color} />
          ) : (
            <Avatar type="user" src={row.userAvatar.emoji} backgroundColor={row.userAvatar.color} />
          )}
          <Link href={`/user/${row.userId}`}>
            <a>
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
          {isAerialLeaderboard && <span className="totalTime">{row.difficulty}</span>}
          {row.countryCode && (
            <div className="countryFlag">
              <img src={`https://countryflagsapi.com/svg/${row.countryCode}`} alt="Country Flag"></img>
            </div>
          )}

          {!isAerialLeaderboard && (
            <Link href={`/results/${row._id}`}>
              <a>
                <Icon size={20} fill="#fff">
                  <ChartBarIcon />
                </Icon>
              </a>
            </Link>
          )}

          {isAerialLeaderboard && !row.countryCode && (
            <div className="allCountries">
              <span>--</span>
            </div>
          )}
        </FlexGroup>
      </div>
    </StyledLeaderboardItem>
  )
}

export default LeaderboardItem
