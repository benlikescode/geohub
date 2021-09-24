import {FC, ReactNode } from 'react'
import { StyledIcon } from '.'

type Props = {
  size: number
  fill?: string
  children: ReactNode
}

const Icon: FC<Props> = ({size, fill, children}) => {
  return (
    <StyledIcon size={size} fill={fill}>
      { children }
    </StyledIcon>
  )
}

export default Icon