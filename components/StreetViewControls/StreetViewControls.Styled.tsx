import styled from 'styled-components'

const StyledStreetViewControls = styled.div`
  position: absolute;
  bottom: 100px;
  left: 10px;
  z-index: 2;
  display: grid;
  gap: 15px;

  .controlBtn {
    height: 48px;
    width: 48px;
    position: relative;
  }
`

export default StyledStreetViewControls
