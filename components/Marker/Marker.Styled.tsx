import styled from 'styled-components'

type StyledProps = {}

const StyledMarker = styled.div<StyledProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: #000;
  border: 3px solid #fff;
  border-radius: 100%;
  transform: translate(-50%, -50%);
  //pointer-events: none !important;
  background-color: red !important;
`

export default StyledMarker
