import styled from 'styled-components'

type StyledProps = {
  size: number
  fill?: string
  padding?: string
  hoverColor?: string
  hoverTransition?: boolean
}

const StyledIcon = styled.div<StyledProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ padding }) => padding && padding};
  
  svg {
    height: ${({ size }) => size ? size : '24'}px;
    width: ${({ size }) => size ? size : '24'}px;
    color: ${({ fill }) => fill ? fill : 'var(--background5)'};

    path {
      stroke-width: 1.5;
    }

    :hover {
      color: ${({ hoverColor }) => hoverColor};
      transition: ${({ hoverTransition }) => hoverTransition ? 'color .2s ease-in-out' : 'none'};
    }
  }
`

export default StyledIcon