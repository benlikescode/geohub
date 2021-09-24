import styled from 'styled-components'

type StyledProps = {
  size: number
  fill?: string
}

const StyledIcon = styled.div<StyledProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    height: ${({ size }) => size ? size : '16'}px;
    color: ${({ fill }) => fill ? fill : '#fff'};
  }
`

export default StyledIcon