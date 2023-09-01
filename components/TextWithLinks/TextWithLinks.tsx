import { FC, Key, ReactNode } from 'react'
import Linkify from 'react-linkify'
import { StyledTextWithLinks } from './'

type Props = {
  children: ReactNode
}

const componentDecorator = (href: string, text: string, key: Key) => (
  <a href={href} key={key} target="_blank" rel="noopener noreferrer">
    {text}
  </a>
)

const TextWithLinks: FC<Props> = ({ children }) => {
  return (
    <StyledTextWithLinks>
      <Linkify componentDecorator={componentDecorator}>{children}</Linkify>
    </StyledTextWithLinks>
  )
}

export default TextWithLinks
