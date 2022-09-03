import { FC } from 'react'

import { MobileNav, Navbar, Sidebar } from '@components/Layout'
import { Spinner } from '@components/System/Spinner'

import { StyledLoadingPage } from './'

const LoadingPage: FC = () => {
  return (
    <StyledLoadingPage>
      <Navbar />

      <div className="appBody">
        <div className="sidebarWrapper">
          <Sidebar />
        </div>

        <main>
          <Spinner />
        </main>
      </div>

      <MobileNav />
    </StyledLoadingPage>
  )
}

export default LoadingPage
