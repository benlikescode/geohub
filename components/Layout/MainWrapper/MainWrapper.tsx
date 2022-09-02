import React, { FC, ReactNode } from 'react'
import { StyledMainWrapper } from '.'

type Props = {
  children: ReactNode
}

const MainWrapper: FC<Props> = ({ children }) => {
  return <StyledMainWrapper>{children}</StyledMainWrapper>
}

export default MainWrapper
