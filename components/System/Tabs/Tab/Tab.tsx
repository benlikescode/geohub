import React, { FC, ReactNode } from 'react'

import { StyledTab } from './'

type Props = {
  children: ReactNode
  isActive?: boolean
  onClick: () => void
}

const Tab: FC<Props> = ({ children, isActive, onClick }) => {
  return (
    <StyledTab isActive={isActive} onClick={onClick} role="tab" aria-selected={isActive}>
      {children}
    </StyledTab>
  )
}

export default Tab
