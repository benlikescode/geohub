import { FC } from 'react'

import { MobileNav, Navbar, Sidebar } from '@components/Layout'
import { Spinner } from '@components/System/Spinner'

import { StyledLoadingPage } from './'

const LoadingPage: FC = () => {
  return (
    <StyledLoadingPage>
      <main>
        <Spinner />
      </main>
    </StyledLoadingPage>
  )
}

export default LoadingPage
