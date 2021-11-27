import styled from 'styled-components'

const StyledMapPage = styled.div`
  main {
    display: flex;
    flex-direction: column;
    gap: 50px;
  }

  .name {
    font-size: 24px;
  }

  .description {
    color: var(--color2);
    font-weight: 400;
  }

  .otherMapsTitle {
    font-size: 20px;
  }

  .otherMaps {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.2rem;
    margin-top: 1rem;

    @media (max-width: 1400px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  .mapDetailsSection {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }

  .mapDescriptionWrapper {
    display: flex;
    gap: 25px;
    padding: 25px 30px;
  }

  .descriptionColumnWrapper {
    display: flex;
    flex-direction: column;
    gap: 25px;
    margin-top: 15px;
  }

  .descriptionColumn {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`

export default StyledMapPage
