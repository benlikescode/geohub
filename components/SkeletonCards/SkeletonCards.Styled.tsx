import styled from 'styled-components'

type StyledProps = {}

const StyledSkeletonCard = styled.div<StyledProps>`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.2rem;
  z-index: 1;

  @media (max-width: 1350px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 850px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

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

export default StyledSkeletonCard
