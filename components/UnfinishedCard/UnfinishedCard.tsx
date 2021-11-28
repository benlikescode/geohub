import Link from 'next/link'
import React, { FC } from 'react'
import { StyledUnfinishedCard } from '.'
import { mailman } from '../../backend/utils/mailman'
import { Avatar, FlexGroup } from '../System'

type Props = {
  mapName: string
  mapAvatar: string
  round: number
  points: number
  gameId: string
  reloadGames: (gameId: string) => void
}

const UnfinishedCard: FC<Props> = ({ mapName, mapAvatar, round, points, gameId, reloadGames }) => {

  const handleDelete = async () => {
    await mailman(`games/${gameId}`, 'DELETE')
    reloadGames(gameId)
  }

  return (
    <StyledUnfinishedCard>
      <div className="mapWrapper">
        <Avatar url={mapAvatar} size={40} alt={`${mapName} map avatar`} />
        <span className="mapName">{mapName}</span>
      </div>
      <div className="bottomWrapper">
        <div className="gameInfo">
          <span className="gameInfoItem">{`Round ${round} / 5`}</span>
          <div className="divider"></div>
          <span className="gameInfoItem">{`${points} points`}</span>
        </div>

        <FlexGroup gap={15}>
          <Link href={`/game/${gameId}`}>
            <a>
              <button className="resumeBtn">Resume</button>
            </a>
          </Link>
    
          <button className="deleteBtn" onClick={() => handleDelete()}>Delete</button>
        </FlexGroup>
      </div>
    </StyledUnfinishedCard>
  )
}

export default UnfinishedCard
