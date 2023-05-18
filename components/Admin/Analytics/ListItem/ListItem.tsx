import Link from 'next/link'
import { FC } from 'react'
import { Avatar } from '@components/System'
import { GameType, UserType } from '@types'
import { COUNTRY_STREAK_DETAILS, DAILY_CHALLENGE_DETAILS } from '@utils/constants/random'
import { formatMonthDayYearTime } from '@utils/dateHelpers'
import { StyledListItem } from './'

type Props = {
  title: string
  data: UserType[] | GameType[]
}

const ListItem: FC<Props> = ({ title, data }) => {
  const dataToShow = () => {
    if (title === 'New Users') {
      const userData = data as UserType[]

      return userData.map((user, idx) => (
        <div className="item-wrapper" key={idx}>
          <Link href={`/user/${user._id}`}>
            <a className="item-details">
              <div className="item-avatar">
                <Avatar type="user" src={user.avatar.emoji} backgroundColor={user.avatar.color} />
              </div>
              <div className="item-name">
                <span>{user.name}</span>
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
      const gameData = data as GameType[]

      return gameData.map((game, idx) => (
        <div className="item-wrapper" key={idx}>
          <Link href={`/results/${game._id}`}>
            <a className="item-details">
              <div className="item-avatar">
                {game.mapDetails && (
                  <Avatar
                    type="map"
                    src={
                      game.mode === 'streak'
                        ? COUNTRY_STREAK_DETAILS.previewImg
                        : game.isDailyChallenge
                        ? DAILY_CHALLENGE_DETAILS.previewImg
                        : game.mapDetails?.[0]?.previewImg
                    }
                    outlineSize={1}
                  />
                )}
              </div>
              <div className="item-name">
                <span>
                  {game.mode === 'streak'
                    ? COUNTRY_STREAK_DETAILS.name
                    : game.isDailyChallenge
                    ? DAILY_CHALLENGE_DETAILS.name
                    : game.mapDetails?.[0]?.name}
                </span>
              </div>
            </a>
          </Link>

          <div className="item-created-date">
            <span>{formatMonthDayYearTime(game.createdAt)}</span>
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
