import React, { FC, ReactNode } from 'react'

import { MobileNav, Navbar, Sidebar } from '@components/Layout'

import { StyledLayout } from './'

type Props = {
  removeWrapper?: boolean
  children: ReactNode
}

const Layout: FC<Props> = ({ removeWrapper, children }) => {
  return (
    <StyledLayout>
      <Navbar />

      <div className="appBody">
        <div className="sidebarWrapper">
          <Sidebar />
        </div>

        <main>{removeWrapper ? children : <div className="mainContent">{children}</div>}</main>
      </div>

      <MobileNav />
    </StyledLayout>
  )
}

export default Layout
