import { FC, ReactNode } from 'react'
import { StyledLayout } from '.'

type Props = {
  hasSidebar?: boolean
  children: ReactNode
}

const Layout: FC<Props> = ({ hasSidebar, children }) => {
  return (
    <StyledLayout hasSidebar={hasSidebar}>
      {children}
    </StyledLayout>
  )
}

export default Layout
