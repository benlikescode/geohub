import { FC, ReactNode } from 'react'

import { StyledBanner } from './'

type Props = {
  children: ReactNode
  hasPadding?: boolean
}

const Banner: FC<Props> = ({ children, hasPadding }) => {
  return (
    <StyledBanner hasPadding={hasPadding}>
      {children}
    </StyledBanner>
  )
}

export default Banner
