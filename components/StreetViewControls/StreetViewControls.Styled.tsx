import styled from 'styled-components'

const StyledStreetViewControls = styled.div`
  position: absolute;
  bottom: 100px;
  left: 10px;
  z-index: 2;
  display: grid;
  gap: 15px;

  .control-button-wrapper {
    .control-button {
      height: 48px;
      width: 48px;
      position: relative;

      svg {
        height: 22px;
        color: #fff;
      }
    }
  }
`

export default StyledStreetViewControls
