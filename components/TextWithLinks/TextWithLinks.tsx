import { FC, ReactNode } from 'react'
import Linkify from 'react-linkify'
import { StyledTextWithLinks } from './'

type Props = {
  children: ReactNode
}

const TextWithLinks: FC<Props> = ({ children }) => {
  return (
    <StyledTextWithLinks>
      <Linkify>{children}</Linkify>
    </StyledTextWithLinks>
  )
}

export default TextWithLinks
