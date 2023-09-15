import Link from 'next/link'
import { FC } from 'react'
import { Avatar } from '@components/system'
import { AnalyticsType } from '@types'
import { formatMapDetails, formatMonthDayYearTime } from '@utils/helpers'
import { StyledListItem } from './'

type Props = {
  title: string
  data: AnalyticsType
}

const ListItem: FC<Props> = ({ title, data }) => {
  const dataToShow = () => {
    if (title === 'New Users') {
      const userData = data.recentUsers

      return userData.map((user, idx) => (
        <div className="item-wrapper" key={idx}>
          <Link href={`/user/${user._id}`}>
            <a className="item-details">
              <div className="item-avatar">
                <Avatar type="user" src={user.avatar.emoji} backgroundColor={user.avatar.color} />
              </div>
              <div className="item-text-wrapper">
                <span className="item-text-1">{user.name}</span>
                <span className="item-text-2">
                  {user.gamesPlayed} Game{user.gamesPlayed !== 1 && 's'}
                </span>
              </div>
            </a>
          </Link>

          <div className="item-created-date">
            <span>{formatMonthDayYearTime(user.createdAt)}</span>
          </div>
        </div>
      ))
    }

    if (title === 'Recent Games') {
      const gameData = data.recentGames

      return gameData.map((game, idx) => (
        <div className="item-wrapper" key={idx}>
          <Link href={`/results/${game._id}`}>
            <a className="item-details">
              <div className="item-avatar">
                {game.mapDetails && <Avatar type="map" src={formatMapDetails(game, 'previewImg')} />}
              </div>
              <div className="item-text-wrapper">
                <span className="item-text-1">{formatMapDetails(game, 'name')}</span>
                <span className="item-text-2">{game.userDetails.name}</span>
              </div>
            </a>
          </Link>

          <div className="item-created-date">
            <span>{formatMonthDayYearTime(game.createdAt)}</span>
          </div>
        </div>
      ))
    }

    if (title === 'New Users By Day') {
      const usersByDay = data.newUsersByDay

      return usersByDay.map((item, idx) => (
        <div key={idx} className="item-wrapper">
          <div className="item-details">
            <span>{item.count}</span>
          </div>

          <div className="item-created-date">
            <span>{item.date}</span>
          </div>
        </div>
      ))
    }

    if (title === 'Games Played By Day') {
      const gamesByDay = data.gamesPlayedByDay

      return gamesByDay.map((item, idx) => (
        <div key={idx} className="item-wrapper">
          <div className="item-details">
            <span>{item.count}</span>
          </div>

          <div className="item-created-date">
            <span>{item.date}</span>
          </div>
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
