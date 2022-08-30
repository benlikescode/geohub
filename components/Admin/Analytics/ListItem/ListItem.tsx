import Link from 'next/link'
import React, { FC } from 'react'
import { StyledListItem } from '.'
import { GameType, UserType } from '../../../../types'
import { formatMonthDayYearTime } from '../../../../utils/dateHelpers'
import { Avatar } from '../../../System'

type Props = {
  title: string
  data: UserType[] | GameType[]
}

const ListItem: FC<Props> = ({ title, data }) => {
  const dataToShow = () => {
    if (title === 'New Users') {
      const userData = data as UserType[]

      return userData.map((user, idx) => (
        <div className="user-item" key={idx}>
          <Link href={`/user/${user._id}`}>
            <a className="user-details">
              <div className="user-avatar">
                <Avatar url={`/images/avatars/${user.avatar}.jpg`} />
              </div>
              <div className="user-name">
                <span>{user.name}</span>
              </div>
            </a>
          </Link>

          <div className="user-created-date">
            <span>{formatMonthDayYearTime(user.createdAt)}</span>
          </div>
        </div>
      ))
    }

    if (title === 'Recent Games') {
      const gameData = data as GameType[]

      return gameData.map((game, idx) => (
        <div key={idx}>
          <span>YOO</span>
        </div>
      ))
    }
  }
  return (
    <StyledListItem>
      <div className="analytics-group-item">
        <div className="analytics-heading">
          <span className="analytics-heading-title">{title}</span>
        </div>
        <div className="analytics-data">{dataToShow()}</div>
      </div>
    </StyledListItem>
  )
}

export default ListItem
