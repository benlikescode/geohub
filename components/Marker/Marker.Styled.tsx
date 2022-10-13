import styled from 'styled-components'

type StyledProps = {}

const StyledMarker = styled.div<StyledProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  //background-color: #000;
  border: 2px solid #fff;
  border-radius: 100%;
  transform: translate(-50%, -50%);
  //pointer-events: none !important;
  //background-color: red !important;

  &:hover {
    transform: translate(-50%, -50%) scale(1.05);
  }
`

export default StyledMarker
