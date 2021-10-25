import styled from 'styled-components'

type StyledProps = {
  borderColor: string
  size?: number
}

const StyledBadge = styled.div<StyledProps>`
  height: ${({ size }) => size ? size : '60'}px;
  width: ${({ size }) => size ? size : '60'}px;
  position: relative;

  img {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    object-fit: cover;
    border-radius: 50%;
    height: 100%;
    width: 100%;
    border: ${({ borderColor }) => `3px solid var(--${borderColor})`};
  }
  



  
`

export default StyledBadge
