import styled from 'styled-components'

type StyledProps = {}

const StyledStreaksLeaderboard = styled.div<StyledProps>`
  margin-top: -20px;
  padding: 0 3.5rem;
  max-width: 1400px;
  width: 100%;
  z-index: 1;
  padding-bottom: 3rem;

  @media (max-width: 1300px) {
    max-width: 100%;
    padding: 0;
  }

  .leaderboard-wrapper {
    display: flex;
    justify-content: space-between;
    gap: 50px;
    background-color: var(--background2);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    padding: 25px;

    .leaderboard-header {
      font-size: 20px;
      border-bottom: 1px solid #2f3133;
      padding-bottom: 8px;
    }

    .users-list {
      width: 100%;

      .user-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #2f3133;
        padding: 16px;
        cursor: pointer;

        &.selected {
          background-color: #222;
        }

        .user-details {
          display: flex;
          align-items: center;
          gap: 15px;
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

        .game-details {
          display: grid;
          gap: 4px;

          .streak-count {
            color: #bbb;
            font-size: 14px;
          }

          .time-count {
            font-weight: 400;
            font-size: 14px;
            color: #8f8f8f;
          }
        }
      }
    }

    .countries-list {
      width: 100%;
    }
  }
`

export default StyledStreaksLeaderboard
