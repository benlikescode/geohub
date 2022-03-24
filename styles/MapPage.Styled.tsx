import styled from 'styled-components'

const StyledMapPage = styled.div`
  // Override Horizontal Padding In Layout.Styled
  .mainContent {
    @media (max-width: 600px) {
      padding: 0;
    }
  }

  .name {
    font-size: 24px;
  }

  .description {
    color: var(--color2);
    font-weight: 400;
  }

  .otherMapsWrapper {
    @media (max-width: 600px) {
      padding: 1rem;
    }
  }

  .otherMapsTitle {
    font-size: 20px;
  }

  .otherMaps {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.2rem;
    margin-top: 1rem;

    @media (max-width: 1350px) {
      grid-template-columns: 1fr 1fr;
    }

    @media (max-width: 850px) {
      grid-template-columns: 1fr;
      gap: 2.5rem;
    }
  }

  .mapDetailsSection {
    display: flex;
    height: 100%;
    background-color: var(--background2);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 12px;

    @media (max-width: 1200px) {
      flex-direction: column;
    }

    @media (max-width: 600px) {
      border-radius: 0;
      border: none;
      background-color: transparent;
    }
  }

  .mapDescriptionWrapper {
    display: flex;
    gap: 25px;
    padding: 25px 30px;
    flex-grow: 1;
    width: 100%;

    @media (max-width: 1550px) {
      flex-shrink: 1.25;
      padding: 1rem 1.5rem;
    }

    @media (max-width: 1200px) {
      padding: 1.5rem;
    }
  }

  .statsWrapper {
    width: 100%;
    flex-grow: 1;
    flex-shrink: 1.25;
  }

  .descriptionColumnWrapper {
    display: flex;
    flex-direction: column;
    gap: 25px;
    margin-top: 0.5rem;
  }

  .descriptionColumn {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`

export default StyledMapPage
