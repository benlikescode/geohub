import React, { FC, ReactNode } from 'react'
import { StyledLayout } from '.'
import { Sidebar } from '..'
import { useViewport } from '../../../utils/hooks'
import { SmallSidebar } from '../Sidebar'

type Props = {
  children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  const width = useViewport()

  return (
    <StyledLayout size={width < 1000 ? 'small' : 'normal'}>
      <aside>
        {width < 1000 ? <SmallSidebar /> : <Sidebar />}   
      </aside>
      
      {children}
    </StyledLayout>
  )
}

export default Layout
