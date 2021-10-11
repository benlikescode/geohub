import styled from 'styled-components'

const StyledLeaderboardItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--background2);

  .userSection {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 1rem;
    user-select: none;
    cursor: pointer;
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
