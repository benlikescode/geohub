import styled from 'styled-components'

const StyledOngoingGamesPage = styled.div`
  // May not be using anymore
  .header-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
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

        .mapName {
          font-size: 1.125rem;
          width: 175px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          @media (max-width: 800px) {
            font-size: 1rem;
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

          @media (max-width: 600px) {
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
      }

      .mapResumeBtn {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        padding: 10px 16px;
        user-select: none;
        background-color: var(--mediumPurple);

        svg {
          height: 20px;
          color: #fff;
          margin-left: 6px;
        }

        &:hover {
          background-color: var(--indigo-600);
        }
      }

      // May be able to remove mapEditBtn (not in use anymore?)
      .mapEditBtn,
      .mapDeleteBtn {
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

        &.mapDeleteBtn {
          background-color: rgb(255, 255, 255, 0.1);
        }

        svg {
          height: 20px;
          color: #fff;
        }

        &:hover {
          background-color: var(--indigo-600);

          &.mapDeleteBtn {
            background-color: #991b1b;
          }
        }
      }
    }
  }
`

export default StyledOngoingGamesPage
