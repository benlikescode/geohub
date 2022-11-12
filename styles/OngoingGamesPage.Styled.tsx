import styled from 'styled-components'

const StyledOngoingGamesPage = styled.div`
  .ongoing-table {
    background-color: var(--background2);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 6px;
    max-width: 900px;
    width: 100%;
  }

  .ongoing-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;

    .game-info-pills {
      margin-right: 20px;
      display: flex;
      align-items: center;
      gap: 10px;

      .game-info-pill {
        letter-spacing: 0.06rem;
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
      }
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
      border-bottom: 1px solid #333;
    }

    .flex-left {
      display: flex;
      align-items: center;

      .map-details {
        display: flex;
        align-items: center;
        gap: 1rem;

        .mapName {
          font-size: 1.25rem;
          width: 175px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

      .game-details {
        color: #8e8e8e;
        font-weight: 400;
        font-size: 1rem;
      }
    }

    .ongoing-buttons {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

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
        background-color: #732fe9;

        &.mapDeleteBtn {
          background-color: #991b1b;
        }
      }
    }
  }
`

export default StyledOngoingGamesPage
