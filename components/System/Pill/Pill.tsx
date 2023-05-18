import { FC } from 'react'
import { StyledPill } from './'

type Props = {
  label: string
  className?: string
}

const Pill: FC<Props> = ({ label, className }) => {
  return (
    <StyledPill className={className}>
      <span className="pillLabel">{label}</span>
    </StyledPill>
  )
}

export default Pill
