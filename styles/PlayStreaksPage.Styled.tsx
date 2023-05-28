import styled from 'styled-components'

const StyledPlayStreaksPage = styled.div`
  .name-container {
    display: flex;
    align-items: center;

    .name-wrapper {
      display: grid;

      .name {
        font-size: 22px;
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        @media (max-width: 800px) {
          font-size: 18px;
        }
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

  .mapAvatar {
    @media (max-width: 600px) {
      display: none;
    }
  }

  .map-details-section {
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

  .map-description-wrapper {
    width: 100%;
  }

  .statsWrapper {
    display: contents;
  }

  .description-column-wrapper {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    width: 100%;

    .description-column {
      display: flex;
      align-items: center;
    }
  }

  .map-play-btn {
    &.mobile {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      font-size: 1rem;
      font-weight: 500;
      user-select: none;
      background-color: var(--mediumPurple);
      color: rgb(255, 255, 255, 0.7);
      height: 52px;
      width: 52px;
      display: none;

      svg {
        height: 24px;
        color: #fff;
      }

      &:hover {
        background-color: var(--indigo-600);
      }
    }
  }

  /* @media (max-width: 600px) {
    .map-play-btn {
      display: none;

      &.mobile {
        display: block;
      }
    }
  } */
`

export default StyledPlayStreaksPage
