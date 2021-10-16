import styled from 'styled-components'

type StyledProps = {
  rotation: number
}

const StyledStreetViewControls = styled.div<StyledProps>`
  position: absolute;
  bottom: 50px;
  left: 15px;
  z-index: 2;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 15px;
  
  .compass {
    width: 70px;
    height: 70px;
    border-radius: 30px;
    position: relative;

    img {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      height: 100%;
      width: 100%;
      transform: rotate(${({ rotation }) => rotation ? rotation : 0}deg);
      color: black;
    }
  }
`

export default StyledStreetViewControls
