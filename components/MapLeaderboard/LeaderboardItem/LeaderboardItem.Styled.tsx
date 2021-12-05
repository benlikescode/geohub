import styled from 'styled-components'

const StyledLeaderboardItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: var(--border);
  padding: 16px 40px;

  .userPlace {
    width: 1.5rem;
  }

  .userSection {
    display: flex;
    align-items: center;
    gap: 15px;
    user-select: none;
    cursor: pointer;
    font-weight: 400;
  }

  .userInfo {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .resultsSection {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .totalTime {
    color: var(--color3);
    font-size: 14px;
    width: 80px;
  }

  .totalPoints {
    width: 120px;
  }
`

export default StyledLeaderboardItem
