import React, { FC } from 'react'
import { StyledSkeleton } from '.'

type Props = {
  variant?: 'rectangular' | 'circular'
  height?: number
  width?: number
}

const Skeleton: FC<Props> = ({ variant, height, width }) => {
  return <StyledSkeleton variant={variant} height={height} width={width}></StyledSkeleton>
}

export default Skeleton
