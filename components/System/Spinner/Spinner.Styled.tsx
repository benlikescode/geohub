import styled from 'styled-components'

type StyledProps = {
  size?: number
  fill?: string
}

const StyledSpinner = styled.div<StyledProps>`
  height: ${({ size }) => size ? size : 60}px;
  width: ${({ size }) => size ? size : 60}px;

  svg {
    height: 100%;
    width: 100%;
    fill: var(--color2);
    animation: loading-spinner .5s linear infinite;
    
    @keyframes loading-spinner {
      100% {
        transform: rotate(1turn);
      }
    }
  }
`

export default StyledSpinner
