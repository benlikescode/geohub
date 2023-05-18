import { FC, ReactNode } from 'react'
import { StyledResultsWrapper } from './'

type Props = {
  children: ReactNode
}

const ResultsWrapper: FC<Props> = ({ children }) => {
  return <StyledResultsWrapper>{children}</StyledResultsWrapper>
}

export default ResultsWrapper
