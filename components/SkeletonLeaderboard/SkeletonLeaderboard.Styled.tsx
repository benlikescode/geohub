import styled from 'styled-components'

type StyledProps = {}

const StyledSkeletonLeaderboard = styled.div<StyledProps>`
  background-color: var(--background2);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 6px;

  .leaderboardTop {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;

    @media (max-width: 1000px) {
      padding: 16px;
    }
  }

  .skeleton-user-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;

    &:not(:first-child) {
      border-top: var(--border);
    }

    .skeleton-user-details {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .skeleton-user-created-date {
      display: flex;
      align-items: center;
      gap: 20px;
    }
  }

  @media (max-width: 600px) {
    border-radius: 0;
    border: none;
    background-color: transparent;

    .skeleton-user-name {
      width: 70px;
    }
  }

  @media (max-width: 650px) {
    .skeleton-total-time {
      display: none;
    }
  }

  @media (max-width: 850px) {
    .skeleton-total-points {
      width: 100px;
    }
  }
`

export default StyledSkeletonLeaderboard
