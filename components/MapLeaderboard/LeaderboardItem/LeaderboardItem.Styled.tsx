import styled from 'styled-components'

type StyledProps = {
  highlight: boolean
}

const StyledLeaderboardItem = styled.div<StyledProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 1rem 20px;
  background-color: ${({ highlight }) => (highlight ? '#202020' : 'transparent')};

  &:last-child {
    border-radius: 0 0 6px 6px;
  }

  &:not(:first-child) {
    border-top: var(--border);
  }

  @media (max-width: 1000px) {
    padding: 1rem;
  }

  @media (max-width: 600px) {
    &:last-child {
      border-radius: 0;
    }
  }

  .user-section {
    display: flex;
    align-items: center;
    gap: 15px;
    user-select: none;
    font-weight: 400;

    .user-place {
      width: 1.5rem;
      flex-shrink: 0;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 8px;

      .username-wrapper {
        display: grid;

        .username {
          font-size: 1rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: block;

          @media (max-width: 850px) {
            font-size: 14px;
          }
        }
      }
    }
  }

  .results-section {
    display: flex;
    align-items: center;
    gap: 1rem;

    .total-points {
      width: 120px;
      font-size: 16px;

      @media (max-width: 850px) {
        width: 100px;
        font-size: 14px;
      }
    }

    .best-streak-wrapper {
      display: flex;
      align-items: center;

      .best-streak {
        width: 70px;
        font-size: 16px;

        @media (max-width: 850px) {
          width: 100px;
          font-size: 14px;
        }
      }

      svg {
        height: 20px;
        margin-right: 6px;
        color: #fbbf24;
      }
    }

    .total-time {
      color: var(--color3);
      font-size: 14px;
      width: 80px;
      font-weight: 400;

      @media (max-width: 650px) {
        display: none;
      }
    }

    .results-link {
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        height: 20px;
        color: #a0a0a0;

        path {
          stroke-width: 1.5;
        }
      }
    }
  }
`

export default StyledLeaderboardItem
