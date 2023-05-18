import { FC, ReactNode } from 'react'
import { StyledTabs } from './'

type Props = {
  children: ReactNode
}

const Tabs: FC<Props> = ({ children }) => {
  return <StyledTabs>{children}</StyledTabs>
}

export default Tabs
