import styled from 'styled-components'

type StyledProps = {
  highlight: boolean
  removeResults?: boolean
}

const StyledLeaderboardItem = styled.div<StyledProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 1rem 20px;
  background-color: ${({ highlight }) => (highlight ? '#202020' : 'transparent')};

  &:last-child {
    border-radius: 0 0 6px 6px;
  }

  &:not(:first-child) {
    border-top: var(--border);
  }

  @media (max-width: 1000px) {
    padding: 1rem;
  }

  @media (max-width: 600px) {
    &:last-child {
      border-radius: 0;
    }
  }

  .userPlace {
    font-feature-settings: 'tnum';
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

  .username-wrapper {
    display: grid;

    .username {
      font-size: 1rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: block;

      @media (max-width: 850px) {
        font-size: 14px;
      }
    }
  }

  .resultsSection {
    display: flex;
    align-items: center;
    gap: 1rem;

    ${({ removeResults }) => removeResults && 'margin-right: -16px'};

    .results-link {
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        height: 20px;
        color: #a0a0a0;

        path {
          stroke-width: 1.5;
        }
      }
    }
  }

  .totalTime {
    color: var(--color3);
    font-size: 14px;
    width: 80px;
    font-weight: 400;

    @media (max-width: 650px) {
      display: none;
    }
  }

  .bestStreakWrapper {
    display: flex;
    align-items: center;

    .bestStreak {
      width: 55px;
      font-size: 16px;

      @media (max-width: 850px) {
        font-size: 14px;
      }
    }

    svg {
      height: 20px;
      margin-right: 6px;
      color: #fbbf24;
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

export default StyledLeaderboardItem
