import { FC } from 'react'
import { StyledBadge } from '.'

type Props = {
  image: string
  borderColor: 'bronze' | 'silver' | 'gold'
  hoverText: string
}

const Badge: FC<Props> = ({ image, borderColor, hoverText }) => {
  return (
    <StyledBadge borderColor={borderColor}>
      <svg viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="img" patternUnits="userSpaceOnUse" width="100" height="100">
            <image xlinkHref={image} x="-25" width="150" height="100" />
          </pattern>
        </defs>
        <polygon id="hex" points="50 1 95 25 95 75 50 99 5 75 5 25" fill="url(#img)"/>
      </svg>
    </StyledBadge>
  )
}

export default Badge
