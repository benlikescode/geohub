import { FC } from 'react'
import { BadgeCheckIcon } from '@heroicons/react/solid'
import { StyledVerifiedBadge } from './'

type Props = {
  size?: number
}

const VerifiedBadge: FC<Props> = ({ size }) => {
  return (
    <StyledVerifiedBadge size={size}>
      <BadgeCheckIcon />
    </StyledVerifiedBadge>
  )
}

export default VerifiedBadge
