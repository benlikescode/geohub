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
  }

  .otherMapsWrapper {
    margin-top: 3rem;

    @media (max-width: 600px) {
      padding: 1rem;
    }
  }

  .otherMapsTitle {
    font-size: 20px;
  }

  .mapAvatar {
    @media (max-width: 600px) {
      display: none;
    }
  }

  .otherMaps {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
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
    background-color: var(--background2);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 6px;
    margin-bottom: 3rem;

    @media (max-width: 1200px) {
      flex-direction: column;
    }

    @media (max-width: 600px) {
      border-radius: 0;
      border: none;
      background-color: transparent;
    }
  }

  .profile-avatar {
    background-color: #0e0e10;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    position: relative;
    box-shadow: 0 0 0 3px #0e0e10;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      position: absolute;
      object-fit: cover;
      border-radius: 50%;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }

    .profile-avatar-editing-icon {
      background-color: #363636;
      border-radius: 50rem;
      padding: 0.5rem;
      border: 1px solid rgba(255, 255, 255, 0.55);
      position: absolute;
      top: -0.5rem;
      right: 0;
    }
  }

  .mapDescriptionWrapper {
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
