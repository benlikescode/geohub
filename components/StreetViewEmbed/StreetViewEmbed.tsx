/* eslint-disable react/display-name */
import { FC, memo } from 'react'
import { LocationType } from '@types'
import { StyledStreetViewEmbed } from './'

type Props = {
  location: LocationType
}

const StreetViewEmbed: FC<Props> = memo(({ location }) => (
  <StyledStreetViewEmbed>
    <iframe
      src={`https://www.google.com/maps/embed?pb=!4v${Date.now()}!6m8!1m7!1sgHjWQk96ZlAUz14frhTF5G!2m2!1d${
        location.lat
      }!2d${location.lng}!3f${location.heading}!4f${location.pitch}!5f${location.zoom}`}
      width="100%"
      height="100%"
      style={{ border: 0 }}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  </StyledStreetViewEmbed>
))

export default StreetViewEmbed
