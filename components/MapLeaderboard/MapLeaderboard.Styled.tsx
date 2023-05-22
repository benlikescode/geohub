import styled from 'styled-components'

const StyledMapLeaderboard = styled.div`
  background-color: var(--background2);
  border: 1px solid rgba(255, 255, 255, 0.08);
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
    padding: 20px;

    @media (max-width: 1000px) {
      padding: 16px;
    }
  }

  .title {
    font-size: 1.125rem;
    margin-top: 2px;

    @media (max-width: 1000px) {
      font-size: 1rem;
    }
  }

  .notPlayedMsg {
    color: var(--color4);
    font-weight: 400;
    display: block;
    padding: 0 20px 20px;

    @media (max-width: 1000px) {
      padding: 0 16px 16px;
    }
  }
`

export default StyledMapLeaderboard
