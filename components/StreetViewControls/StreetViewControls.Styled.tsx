import styled from 'styled-components'

const StyledStreetViewControls = styled.div`
  position: absolute;
  bottom: 100px;
  left: 10px;
  z-index: 2;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 15px;

  .controlBtn {
    height: 48px;
    width: 48px;
  }
`

export default StyledStreetViewControls
