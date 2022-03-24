import { FC } from 'react'
import { StyledLoadingPage } from '.'
import { Spinner } from '../../System/Spinner'
import { Navbar, Sidebar } from '..'
import { MobileNav } from '../Sidebar/MobileNav'

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
