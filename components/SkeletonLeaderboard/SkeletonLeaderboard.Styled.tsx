import styled from 'styled-components'

type StyledProps = {}

const StyledSkeletonLeaderboard = styled.div<StyledProps>`
  background-color: var(--background2);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 6px;

  @media (max-width: 600px) {
    border-radius: 0;
    border: none;
    //border-top: 1px solid rgba(255, 255, 255, 0.12);
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
    background-color: transparent;
  }

  .leaderboardTop {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2.5rem;

    @media (max-width: 1000px) {
      padding: 1rem;
    }
  }

  .skeleton-user-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;

    border-top: var(--border);

    .skeleton-user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .skeleton-user-created-date {
      display: flex;
      align-items: center;
      gap: 2rem;
    }
  }
`

export default StyledSkeletonLeaderboard
