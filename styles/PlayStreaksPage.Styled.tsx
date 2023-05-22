import styled from 'styled-components'

const StyledPlayStreaksPage = styled.div`
  // Override Horizontal Padding and Max Width In Layout.Styled
  .mainContent {
    max-width: 1100px;

    @media (max-width: 600px) {
      padding: 0;
    }
  }

  .name-wrapper {
    display: flex;
    align-items: center;

    .name {
      font-size: 22px;
      font-weight: 600;

      @media (max-width: 800px) {
        font-size: 18px;
      }
    }
  }

  .map-creator {
    font-size: 14px;
    color: var(--color3);
    position: relative;
    top: 1px;
  }

  .map-creator-link {
    color: var(--color3);

    &:hover {
      text-decoration: underline;
      color: var(--color2);
    }
  }

  .map-details {
    margin-left: 16px;
    margin-top: 2px;
    display: grid;
    gap: 8px;
  }

  .description {
    color: var(--color3);
    font-weight: 400;

    @media (max-width: 1000px) {
      display: none;
    }
  }

  .otherMapsWrapper {
    margin-top: 2rem;

    @media (max-width: 600px) {
      padding: 1rem;
    }
  }

  .mapAvatar {
    @media (max-width: 600px) {
      display: none;
    }
  }

  .mapDetailsSection {
    background-color: var(--background2);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 6px;
    margin-bottom: 1rem;

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
    width: 100%;
  }

  .statsWrapper {
    display: contents;
  }

  .descriptionColumnWrapper {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    width: 100%;
  }

  .descriptionColumn {
    display: flex;
    align-items: center;
  }

  .skeletonCards {
    margin-top: 3rem;
  }
`

export default StyledPlayStreaksPage
