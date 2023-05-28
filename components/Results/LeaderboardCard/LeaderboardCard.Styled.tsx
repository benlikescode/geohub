import styled from 'styled-components'

const StyledLeaderboardCard = styled.div`
  margin-top: -20px;
  padding: 0 3.5rem;
  max-width: 1400px;
  width: 100%;
  z-index: 1;
  padding-bottom: 3rem;

  .leaderboard-wrapper {
    display: grid;
    gap: 25px;
    background-color: var(--background2);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 6px;

    .game-info-wrapper {
      display: flex;
      align-items: center;
      gap: 50px;
      padding: 20px 16px;

      @media (max-width: 600px) {
        gap: 10px;
        justify-content: space-between;
        padding: 20px 1rem;
      }

      .game-info-item {
        display: flex;
        align-items: center;
        gap: 10px;

        .game-info-content {
          display: flex;
          flex-direction: column;
          gap: 5px;

          .label1 {
            font-size: 14px;
          }

          .label2 {
            font-size: 12px;
            color: var(--color2);
            font-weight: 400;
          }
        }

        .settings-avatar {
          background-color: #262626;
          border-radius: 50%;
          height: 50px;
          width: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;

          @media (max-width: 600px) {
            height: 40px;
            width: 40px;
          }

          svg {
            height: 30px;
            color: var(--color2);

            path {
              stroke-width: 1.5;
            }
          }
        }
      }
    }
  }

  .leaderboard-section {
    .leaderboard-header-row {
      display: grid;
      grid-template-columns: 250px repeat(6, 1fr);

      @media (max-width: 800px) {
        grid-template-columns: 1fr 90px;
      }

      .title-section {
        font-size: 14px;
        color: var(--color3);
        padding-bottom: 8px;

        &:first-child {
          padding-left: 16px;
        }
      }
    }

    .leaderboard-row {
      display: grid;
      grid-template-columns: 250px repeat(6, 1fr);
      border-top: 1px solid #2f3133;
      cursor: pointer;
      padding: 6px 0;

      @media (max-width: 800px) {
        grid-template-columns: 1fr 90px;
      }

      &.selected {
        background-color: #222;
      }

      &:last-child {
        border-radius: 0 0 6px 6px;
      }
    }

    .user-section {
      display: flex;
      align-items: center;
      gap: 15px;
      padding: 1rem;
      user-select: none;

      .user-place {
        max-width: 25px;
        width: 100%;
        font-style: italic;
        font-weight: bold;
      }

      .user-info {
        display: flex;
        align-items: center;
        gap: 8px;

        .username {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 150px;
        }
      }
    }

    .user-result-section {
      display: flex;
      flex-direction: column;
      user-select: none;

      @media (max-width: 1100px) {
        display: flex;
        align-items: flex-start;
        justify-content: center;
      }

      .points-wrapper {
        font-weight: 400;
        font-size: 15px;
        margin-top: auto;

        @media (max-width: 1100px) {
          margin-top: 0;
        }
      }

      .distance-time-wrapper {
        display: flex;
        align-items: center;
        gap: 5px;
        color: var(--color3);
        font-size: 14px;
        font-weight: 400;
        margin-top: 5px;
        margin-bottom: auto;

        @media (max-width: 1100px) {
          display: none;
        }

        .divider {
          color: #606060;
        }
      }
    }
  }

  .hide-on-small {
    @media (max-width: 800px) {
      display: none;
    }
  }

  @media (max-width: 1300px) {
    max-width: 100%;
    padding: 8px;
  }
`

export default StyledLeaderboardCard
