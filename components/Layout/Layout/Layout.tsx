import { FC, ReactNode } from 'react'
import { MobileNav, Navbar, Sidebar } from '@components/Layout'
import { StyledLayout } from './'

type Props = {
  children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <StyledLayout>
      <div className="app-layout">
        <Navbar />

        <div className="appBody">
          <Sidebar />

          <main id="main">{children}</main>
        </div>

        <MobileNav />
      </div>
    </StyledLayout>
  )
}

export default Layout
