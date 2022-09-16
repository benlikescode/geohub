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

      .game-detail {
        display: inline-block;
        width: 120px;
        color: #8e8e8e;
        font-weight: 400;
        font-size: 1rem;

        &:not(:first-child) {
          padding-left: 20px;
        }

        &:not(:last-child) {
          border-right: 2px solid #505050;
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

      .delete-button {
        height: 30px;
        border: 1px solid #a57979;
        color: #cd8989;
        padding: 4px 12px;
        border-radius: 4px;
        background: transparent;
        font-size: 14px;
      }
    }
  }
`

export default StyledOngoingGamesPage
