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
  background-color: #131315;
  border-radius: 50%;
  position: relative;

  @media (max-width: 600px) {
    height: ${({ mobileSize }) => mobileSize && mobileSize}px;
    width: ${({ mobileSize }) => mobileSize && mobileSize}px;
  }

  img {
    box-shadow: ${({ outline, customOutline }) => outline ? 'inset 0 0 0 1px rgba(255, 255, 255, 0.10)' : 
    (customOutline ? customOutline : 'none')}!important;
    border-radius: 50%!important;
  }
`

export default StyledAvatar