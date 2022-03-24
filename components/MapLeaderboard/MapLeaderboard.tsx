import { FC, useState } from 'react'
import { StyledMapLeaderboard } from '.'
import { MapLeaderboardType } from '../../types'
import { Select } from '../System/Select'
import { LeaderboardItem } from './LeaderboardItem'

type Props = {
  leaderboard: MapLeaderboardType[]
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
      
      {leaderboard.length > 0 && (
        leaderboard.map((row, idx) => (
          <LeaderboardItem 
            key={idx}
            finishPlace={idx + 1}
            row={row}
          />
        ))
      )}

      {leaderboard.length <= 0 && (
        <span className="notPlayedMsg">
          This map has not been played yet. Be the first one on the leaderboard!
        </span>    
      )}     
    </StyledMapLeaderboard>
  )
}

export default MapLeaderboard
