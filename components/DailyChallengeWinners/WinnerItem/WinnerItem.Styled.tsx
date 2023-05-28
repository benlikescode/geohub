import styled from 'styled-components'

const StyledWinnerItem = styled.div`
  display: grid;
  gap: 12px;
  padding: 16px 0;

  &:not(:first-child) {
    border-top: var(--border);
  }

  .challenge-day {
    font-size: 12px;
    color: #dcdcdc;
    font-weight: 400;
  }

  .winner-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;

    .user-info {
      display: flex;
      align-items: center;
      gap: 8px;

      .username-wrapper {
        display: grid;

        .username {
          font-size: 15px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }

    .total-points {
      font-size: 15px;
      color: #dcdcdc;
      flex-shrink: 0;
    }
  }

  @media (max-width: 1000px) {
    padding: 1rem;
  }
`

export default StyledWinnerItem
