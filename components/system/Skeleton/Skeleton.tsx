import { FC, HTMLAttributes } from 'react'
import { StyledSkeleton } from './'

type Props = {
  variant?: 'rectangular' | 'circular'
  height?: number
  width?: number
  noBorder?: boolean
} & HTMLAttributes<HTMLDivElement>

const Skeleton: FC<Props> = ({ variant, height, width, noBorder, ...rest }) => {
  return <StyledSkeleton variant={variant} height={height} width={width} noBorder={noBorder} {...rest} />
}

export default Skeleton
