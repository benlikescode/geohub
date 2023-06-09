import styled from 'styled-components'

const StyledSkeletonCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.2rem;

  .skeleton-card-item {
    border-radius: 6px;
    background-color: var(--background2);
    border: 1px solid rgba(255, 255, 255, 0.07);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    height: 300px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
  }
`

export default StyledSkeletonCards
