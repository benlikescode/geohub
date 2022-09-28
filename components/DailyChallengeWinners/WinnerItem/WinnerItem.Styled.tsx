import styled from 'styled-components'

type StyledProps = {}

const StyledWinnerItem = styled.div<StyledProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 20px;

  &:not(:first-child) {
    border-top: var(--border);
  }

  @media (max-width: 1000px) {
    padding: 1rem;
  }

  .userSection {
    display: flex;
    align-items: center;
    gap: 15px;
    user-select: none;
    font-weight: 400;
  }

  .userInfo {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .username {
    font-size: 1rem;
    width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width: 850px) {
      font-size: 14px;
    }
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

    @media (max-width: 650px) {
      display: none;
    }
  }

  .totalPoints {
    width: 120px;
    font-size: 16px;

    @media (max-width: 850px) {
      width: 100px;
      font-size: 14px;
    }
  }
`

export default StyledWinnerItem
