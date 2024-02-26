import styled from 'styled-components'

type StyledProps = {}

const StyledWinnerItem = styled.div<StyledProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;

  &:not(:first-child) {
    border-top: var(--border);
  }

  @media (max-width: 1000px) {
    padding: 1rem;
  }

  .user-wrapper {
    display: flex;
    align-items: center;
    gap: 15px;
    user-select: none;
    font-weight: 400;

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

  .winner-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;

    .challenge-day {
      color: var(--color3);
      font-size: 14px;
      width: 80px;
      font-weight: 400;

      @media (max-width: 650px) {
        display: none;
      }
    }

    .total-points {
      width: 120px;
      font-size: 16px;

      @media (max-width: 850px) {
        width: 100px;
        font-size: 14px;
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

export default StyledWinnerItem
