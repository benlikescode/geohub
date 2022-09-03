import React, { FC, ReactNode } from 'react'

import { StyledBlockQuote } from './'

type Props = {
  background?: string;
  color?: string;
  highlightColor?: string;
  children: ReactNode;
}

const BlockQuote: FC<Props> = ({ background, color, highlightColor, children }) => {
  return (
    <StyledBlockQuote background={background} color={color} highlightColor={highlightColor}>
      <p>{children}</p>
    </StyledBlockQuote>
  )
}

export default BlockQuote