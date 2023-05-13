import styled from 'styled-components'

type StyledProps = {
  highlight: boolean
}

const StyledLeaderboardItem = styled.div<StyledProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
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

  .userPlace {
    width: 1.5rem;
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

  .bestStreakWrapper {
    display: flex;
    align-items: center;

    .bestStreak {
      width: 70px;
      font-size: 16px;

      @media (max-width: 850px) {
        width: 100px;
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

  .countryFlag {
    height: 20px;
    width: 35px;
    position: relative;

    img {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
  }

  .allCountries {
    height: 20px;
    width: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #808080;
  }
`

export default StyledLeaderboardItem
