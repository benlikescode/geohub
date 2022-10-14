import React, { FC } from 'react'

import { Avatar } from '@components/System'
import { FlagIcon } from '@heroicons/react/solid'

import { StyledMarker } from './'

type Props = {
  lat: number
  lng: number
  type: 'guess' | 'actual'
  userAvatar?: { emoji: string; color: string }
  roundNumber?: number
  isFinalResults: boolean
}

const Marker: FC<Props> = ({ lat, lng, type, userAvatar, roundNumber, isFinalResults }) => {
  const handleActualLocationClick = () => {
    window.open(`http://www.google.com/maps?layer=c&cbll=${lat},${lng}`, '_blank')
  }

  return (
    <StyledMarker onClick={() => type === 'actual' && handleActualLocationClick()}>
      {type === 'guess' && <Avatar size={26} type="user" src={userAvatar?.emoji} backgroundColor={userAvatar?.color} />}

      {type === 'actual' && <div className="actual-marker">{isFinalResults ? roundNumber : <FlagIcon />}</div>}
    </StyledMarker>
  )
}

export default Marker
