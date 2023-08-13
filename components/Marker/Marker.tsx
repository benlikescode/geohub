import { FC } from 'react'
import { Avatar } from '@components/system'
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
    <StyledMarker type={type} onClick={() => type === 'actual' && handleActualLocationClick()}>
      {type === 'guess' && (
        <img
          src="https://www.usnews.com/object/image/00000169-5e07-df95-a57d-7ec72aae0000/2-angkor-wat-getty.jpg?update-time=1552060887681&size=responsive640"
          alt=""
        />
      )}

      {type === 'actual' && <div className="actual-marker">{isFinalResults ? roundNumber : <FlagIcon />}</div>}
    </StyledMarker>
  )
}

export default Marker
