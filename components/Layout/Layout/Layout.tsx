import React, { FC, ReactNode } from 'react'

import { MobileNav, Navbar, Sidebar } from '@components/Layout'

import { StyledLayout } from './'

type Props = {
  isHome?: boolean
  maxWidth?: string
  children: ReactNode
}

const Layout: FC<Props> = ({ isHome, maxWidth, children }) => {
  return (
    <StyledLayout isHome={isHome} maxWidth={maxWidth}>
      <Navbar />

      <div className="appBody">
        <main>
          {isHome && (
            <div className="heroBannerWrapper">
              <div className="heroBanner">
                <div className="heroGradient"></div>
              </div>
            </div>
          )}

          <div className="mainContent">{children}</div>
        </main>
      </div>

      <MobileNav />
    </StyledLayout>
  )
}

export default Layout
