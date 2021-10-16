import styled from 'styled-components'

type StyledProps = {
  size?: 'small' | 'large'
  fill?: string
}

const StyledSpinner = styled.div<StyledProps>`
  svg {
    height: 60px;
    width: 60px;
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
