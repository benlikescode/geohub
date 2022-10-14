import styled, { keyframes } from 'styled-components'

type StyledProps = {
  variant?: 'rectangular' | 'circular'
  height?: number
  width?: number
  noBorder?: boolean
}

const shimmer = keyframes`
  0% {
    background-position: -450px 0px;
  }
  100% {
    background-position: 450px 0px;
  }
`

const StyledSkeleton = styled.div<StyledProps>`
  display: inline-block;
  height: ${({ height }) => (height ? `${height}px` : '100%')};
  // removing this may break something... height: ${({ height }) => height ?? 118}px;
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  position: relative;
  opacity: 0.08;
  overflow: hidden;
  background-color: #999999;
  background-image: linear-gradient(to right, #999999 0%, rgb(255, 255, 255, 1) 20%, #999999 40%, #999999 100%);
  background-size: 450px 400px;
  background-repeat: no-repeat;
  animation: ${shimmer} 1.4s linear infinite;
  border-radius: ${({ variant }) => (variant === 'circular' ? '50%' : '6px')};

  ${({ noBorder }) =>
    noBorder &&
    `
        border-radius: 0;
    `}
`

export default StyledSkeleton
