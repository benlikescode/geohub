import { FC } from 'react'
import { StyledSkeleton } from './'

type Props = {
  variant?: 'rectangular' | 'circular'
  height?: number
  width?: number
  noBorder?: boolean
}

const Skeleton: FC<Props> = ({ variant, height, width, noBorder }) => {
  return <StyledSkeleton variant={variant} height={height} width={width} noBorder={noBorder}></StyledSkeleton>
}

export default Skeleton
