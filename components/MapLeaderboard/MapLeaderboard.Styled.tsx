import styled from 'styled-components'

const StyledMapLeaderboard = styled.div`
  background-color: var(--background2);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;

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

  .title {
    font-size: 1.25rem;
    margin-top: 2px;

    @media (max-width: 1000px) {
      font-size: 1rem;
    }
  }

  .notPlayedMsg {
    color: var(--color2);
    font-weight: 400;
    display: block;
    padding: 10px 40px 30px 40px;
  }
`

export default StyledMapLeaderboard
