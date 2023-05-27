import styled from 'styled-components'

const StyledLikedMapsPage = styled.div`
  height: 100%;

  .map-wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.2rem;
  }
`

export default StyledLikedMapsPage
