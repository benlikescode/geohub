import { FC, useState } from 'react'
import { StyledMapLeaderboard } from '.'
import { Select } from '../System/Select'
import { LeaderboardItem } from './LeaderboardItem'

type Props = {
  leaderboard: any[]
}

const MapLeaderboard: FC<Props> = ({ leaderboard }) => {
  const [selectState, setSelectState] = useState()
  const selectOptions = ['Filter by', 'Top', 'Friends']

  return (
    <StyledMapLeaderboard>
      <div className="leaderboardTop">
        <span className="title">Leaderboard</span>
        <Select options={selectOptions} callback={setSelectState}/>
      </div>
      {leaderboard.map((item, idx) => (
        <LeaderboardItem 
          key={idx}
          user={item.user}
          finishPlace={idx + 1}
          totalPoints={item.rounds[item.rounds.length - 1].points}
          totalTime={item.rounds[item.rounds.length - 1].time}
          gameId={item.gameId}
        />
      ))}
    </StyledMapLeaderboard>
  )
}

export default MapLeaderboard
