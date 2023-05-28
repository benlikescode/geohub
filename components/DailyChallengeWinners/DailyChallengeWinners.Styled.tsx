import styled from 'styled-components'

type StyledProps = {}

const StyledDailyChallengeWinners = styled.div<StyledProps>`
  .leaderboard-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  .not-played-msg {
    color: var(--color4);
    font-weight: 400;
  }
`

export default StyledDailyChallengeWinners
