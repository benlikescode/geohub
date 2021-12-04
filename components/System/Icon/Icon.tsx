import {FC, ReactNode } from 'react'
import { StyledIcon } from '.'

type Props = {
  size: number
  fill?: string
  padding?: string
  hoverColor?: string
  hoverTransition?: boolean
  children: ReactNode
}

const Icon: FC<Props> = ({size, fill, padding, hoverColor, hoverTransition, children}) => {
  return (
    <StyledIcon 
      size={size} 
      fill={fill} 
      padding={padding}
      hoverColor={hoverColor} 
      hoverTransition={hoverTransition}
    >
      { children }
    </StyledIcon>
  )
}

export default Icon