import { FC } from 'react'
import { StyledLoadingPage } from '.'
import { Spinner } from '@components/System/Spinner'
import { Navbar, Sidebar, MobileNav } from '@components/Layout'

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
