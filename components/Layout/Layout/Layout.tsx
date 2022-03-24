import React, { FC, ReactNode } from 'react'
import { StyledLayout } from '.'
import { Navbar } from '../Navbar'
import { Sidebar } from '../Sidebar'
import { MobileNav } from '../Sidebar/MobileNav'

type Props = {
  isHome?: boolean;
  maxWidth?: string;
  children: ReactNode;
}

const Layout: FC<Props> = ({ isHome, maxWidth, children }) => {
  return (
    <StyledLayout isHome={isHome} maxWidth={maxWidth}>
      <Navbar />
      
      <div className="appBody">
        <div className="sidebarWrapper">
          <Sidebar />
        </div>
        
        <main>     
          {isHome && (
            <div className="heroBannerWrapper">
              <div className="heroBanner">
                <div className="heroGradient"></div>
              </div>           
            </div>  
          )}

          <div className="mainContent">
            {children}     
          </div>                
        </main>
      </div>

      <MobileNav />
    </StyledLayout>
  )
}

export default Layout
