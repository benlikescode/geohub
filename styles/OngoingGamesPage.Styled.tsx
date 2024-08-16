import styled from 'styled-components'

const StyledOngoingGamesPage = styled.div`
  height: 100%;

  .ongoing-banner {
    background-color: #181818;
    color: var(--color2);
    border-radius: 6px;
    padding: 16px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid rgba(255, 255, 255, 0.05);

    .message {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      font-weight: 400;

      span {
        position: relative;
        top: 1px;
      }

      svg {
        height: 20px;
      }
    }
  }

  .ongoing-table {
    background-color: var(--background2);
    border: 1px solid rgb(30 30 30);
    border-radius: 6px;
  }

  .ongoing-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 1rem;

    &.variant {
      background-color: #181818;
    }

    .game-detail {
      color: #8e8e8e;
      font-weight: 400;
      font-size: 1rem;

      &:not(:first-child) {
        padding-left: 20px;
      }
    }

    &:not(:last-child) {
      border-bottom: 1px solid rgb(30 30 30);
    }

    .flex-left {
      display: flex;
      align-items: center;

      .map-details {
        display: flex;
        align-items: center;
        gap: 12px;

        .mapNameWrapper {
          display: grid;

          .mapName {
            font-size: 1.125rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;

            @media (max-width: 800px) {
              font-size: 1rem;
            }

            @media (max-width: 600px) {
              font-size: 14px;
            }
          }
        }
      }

      .game-details {
        color: #8e8e8e;
        font-weight: 400;
        font-size: 1rem;
      }
    }

    .flex-right {
      display: flex;
      align-items: center;
      gap: 30px;
      flex-shrink: 0;

      @media (max-width: 600px) {
        gap: 10px;
      }

      .game-info-pills {
        display: flex;
        align-items: center;
        gap: 10px;

        .game-info-pill {
          letter-spacing: 0.06rem;
          font-family: var(--font-mono);
          background: rgb(200 200 200 / 8%);
          color: #ffffff82;
          padding: 2px 14px 0 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-transform: uppercase;
          width: fit-content;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
          height: 30px;

          @media (max-width: 900px) {
            &.score {
              display: none;
            }
          }

          @media (max-width: 800px) {
            &.created {
              display: none;
            }
          }

          @media (max-width: 650px) {
            &.round {
              display: none;
            }
          }

          span {
            position: relative;
            top: -1px;
          }
        }
      }

      .ongoing-buttons {
        display: flex;
        align-items: center;
        gap: 1rem;

        @media (max-width: 600px) {
          gap: 10px;
        }

        .play-button,
        .delete-button {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 5px;
          padding: 10px;
          font-size: 1rem;
          font-weight: 500;
          user-select: none;
          background-color: var(--mediumPurple);
          color: rgb(255, 255, 255, 0.7);

          &.delete-button {
            background-color: rgb(255, 255, 255, 0.1);
          }

          svg {
            height: 20px;
            color: #fff;
          }

          &:hover {
            background-color: var(--indigo-600);

            &.delete-button {
              background-color: #991b1b;
            }
          }
        }
      }
    }
  }
`

export default StyledOngoingGamesPage
