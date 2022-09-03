import Image from 'next/image'
import { FC } from 'react'

import { StyledBadge } from './'

type Props = {
  image: string
  borderColor: 'bronze' | 'silver' | 'gold'
  hoverText: string
  size?: number
}

const Badge: FC<Props> = ({ image, borderColor, hoverText, size }) => {
  return (
    <StyledBadge borderColor={borderColor} size={size}>
      <Image src={image} height={size} width={size} alt="GeoHub Badge"/>         
    </StyledBadge>
  )
}

export default Badge
