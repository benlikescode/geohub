import styled from 'styled-components'

type StyledProps = {
  size?: number;
  mobileSize?: number;
  outline?: boolean;
  customOutline?: string;
}

const StyledAvatar = styled.div<StyledProps>`
  height: ${({ size }) => size ? size : '32'}px;
  width: ${({ size }) => size ? size : '32'}px;
  cursor: pointer;

  @media (max-width: 600px) {
    height: ${({ mobileSize }) => mobileSize && mobileSize}px;
    width: ${({ mobileSize }) => mobileSize && mobileSize}px;
  }

  img {
    border: ${({ outline, customOutline }) => outline ? '1px solid rgba(255, 255, 255, 0.10)' : 
    (customOutline ? customOutline : 'none')}!important;
    border-radius: 50%!important;
  }
`

export default StyledAvatar