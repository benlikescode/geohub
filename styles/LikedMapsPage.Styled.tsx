import styled from 'styled-components'

const StyledLikedMapsPage = styled.div`
  .map-wrapper {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.2rem;

    @media (max-width: 1350px) {
      grid-template-columns: 1fr 1fr;
    }

    @media (max-width: 850px) {
      grid-template-columns: 1fr;
      gap: 2.5rem;
    }
  }
`

export default StyledLikedMapsPage
