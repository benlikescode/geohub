import styled from 'styled-components'

type StyledProps = {}

const StyledWinnerItem = styled.div<StyledProps>`
  display: grid;
  gap: 12px;
  padding: 16px 0;

  &:not(:first-child) {
    border-top: var(--border);
  }

  @media (max-width: 1000px) {
    padding: 1rem;
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

    .user-info {
      display: flex;
      align-items: center;
      gap: 8px;

      .username {
        font-size: 15px;
        width: 100px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .total-points {
      font-size: 15px;
      color: #dcdcdc;
    }
  }
`

export default StyledWinnerItem
