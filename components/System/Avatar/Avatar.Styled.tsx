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
    border: ${({ outline }) => outline ? '1px solid rgba(0, 0, 0, 0.37);' : 0};
    border-radius: 50%;
    object-fit: cover;
  }
`

export default StyledAvatar