import { FC } from 'react'

import { Spinner } from '@components/System/Spinner'

import { StyledLoadingPage } from './'

const LoadingPage: FC = () => {
  return (
    <StyledLoadingPage>
      <Spinner size={50} />
    </StyledLoadingPage>
  )
}

export default LoadingPage
