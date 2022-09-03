import { FC, ReactNode } from 'react'

import { StyledFlexGroup } from './'

type Props = {
  children?: ReactNode
  align?: 'center' | 'baseline' | 'flex-start' | 'flex-end'
  justify?: 'center' | 'space-between'
  direction?: 'column' | 'row'
  gap?: number
  className?: string
}

const FlexGroup: FC<Props> = ({ 
  children, 
  align, 
  justify, 
  direction,
  gap, 
  className 
}) => {
  return (
    <StyledFlexGroup 
      align={align} 
      justify={justify} 
      direction={direction}
      gap={gap} 
      className={className}
    >
      {children}
    </StyledFlexGroup>
  )
}

export default FlexGroup