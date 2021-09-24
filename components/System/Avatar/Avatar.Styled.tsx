import styled from 'styled-components'

type StyledProps = {
  size?: number
  defaultColor?: string
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
    border: 2px solid #fff;
  }
  
  .defaultAvatar {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    object-fit: cover;
    border-radius: 50%;
    height: 100%;
    width: 100%;
    background-color: ${({ defaultColor }) => defaultColor};
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export default StyledAvatar