import styled from 'styled-components'

const StyledPuzzlesPage = styled.div`
  // 188px = (56 padding from main) * 2 + 76px height navbar
  #map {
    height: calc(100vh - 188px); 
    width: 100%;
    position: relative;
    border-radius: 12px;
  }
`

export default StyledPuzzlesPage

