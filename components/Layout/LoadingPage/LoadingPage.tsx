import { FC } from 'react'
import { StyledLoadingPage } from '.'
import { Spinner } from '../../System/Spinner'

const LoadingPage: FC = () => {
  return (
    <StyledLoadingPage>
      <Spinner />
    </StyledLoadingPage>
  )
}

export default LoadingPage
