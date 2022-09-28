import styled from 'styled-components'

type StyledProps = {}

const StyledDailyChallengeWinners = styled.div<StyledProps>`
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
    font-size: 1.25rem;
    margin-top: 2px;

    @media (max-width: 1000px) {
      font-size: 1rem;
    }
  }

  .notPlayedMsg {
    color: var(--color3);
    font-weight: 400;
    display: block;
    padding: 0 20px 20px;
  }
`

export default StyledDailyChallengeWinners
