import styled from 'styled-components'

type StyledProps = {
  size?: number
  outline?: boolean
  customOutline?: string
}

const StyledAvatar = styled.div<StyledProps>`
  height: ${({ size }) => size ? size : '32'}px;
  width: ${({ size }) => size ? size : '32'}px;
  cursor: pointer;

  img {
    border: ${({ outline, customOutline }) => outline ? '1px solid rgba(0, 0, 0, 0.37)' : 
    (customOutline ? customOutline : 'none')}!important;
    border-radius: 50%!important;
  }
`

export default StyledAvatar