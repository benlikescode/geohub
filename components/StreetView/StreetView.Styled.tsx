import styled from 'styled-components'

const StyledStreetView = styled.div`

  #map {
    height: 100vh;
    width: 100%;
    position: relative;
  }

  .loadingView {
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--background1);
  }
`

export default StyledStreetView
