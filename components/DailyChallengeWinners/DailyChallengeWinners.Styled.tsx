import styled from 'styled-components'

type StyledProps = {}

const StyledDailyChallengeWinners = styled.div<StyledProps>`
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
    margin-bottom: 16px;
  }

  .notPlayedMsg {
    color: var(--color4);
    font-weight: 400;
  }
`

export default StyledDailyChallengeWinners
