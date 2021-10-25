import styled from 'styled-components'

const StyledLeaderboardItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: var(--border);
  padding: 16px 40px;

  .userSection {
    display: flex;
    align-items: center;
    gap: 15px;
    user-select: none;
    cursor: pointer;
    font-weight: 400;
  }

  .userPlace {
    max-width: 25px;
    width: 100%;
  }

  .userInfo {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .resultsSection {
    display: flex;
    align-items: center;
    gap: 30px;
  }

  .totalTime {
    color: var(--color3);
    font-size: 14px;
  }
`

export default StyledLeaderboardItem
