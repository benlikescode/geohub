import styled from 'styled-components'

type StyledProps = {
  size?: number
  outline?: boolean
}

const StyledAvatar = styled.div<StyledProps>`
  height: ${({ size }) => size ? size : '32'}px;
  width: ${({ size }) => size ? size : '32'}px;
  position: relative;
  cursor: pointer;

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
    border: ${({ outline }) => outline ? '1px solid rgba(0, 0, 0, 0.37);' : 0};
  }
`

export default StyledAvatar