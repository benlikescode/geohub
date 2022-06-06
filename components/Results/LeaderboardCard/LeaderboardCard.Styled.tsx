import styled from 'styled-components'

const StyledLeaderboardCard = styled.div`
  margin-top: -1.2rem;
  padding: 0 3.5rem;
  max-width: ${({ theme }) => theme.breakpoint.l};
  width: 100%;
  z-index: 1;
  padding-bottom: 3rem;

  @media (max-width: 1300px) {
    max-width: 100%;
    padding: 0;
  }

  .leaderboardWrapper {
    display: grid;
    gap: 25px;
  }

  .topSection {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .leaderboardSection {
    display: grid;
    grid-template-columns: 1.5fr repeat(6, 1fr);

    @media (max-width: 1300px) {
      grid-template-columns: 1.2fr repeat(6, 1fr);
    }

    @media (max-width: 800px) {
      grid-template-columns: 1fr 0.4fr;
    }
  }

  .titleSection {
    font-size: 14px;
    color: var(--color2);
    padding-bottom: 8px;

    :first-child {
      padding-left: 20px;
    }
  }

  .username {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 150px;
  }

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

  .rowDivider {
    background: #2f3133;
    border: none;
    grid-column-end: -1;
    grid-column-start: 1;
    height: 1px;
    margin: 0;
  }

  .divider {
    background: #2f3133;
    width: 1px;
    height: 17px;
  }

  .pointsWrapper {
    font-weight: 400;
    margin-top: auto;

    @media (max-width: 1100px) {
      margin-top: 0;
    }
  }

  .distanceTimeWrapper {
    display: flex;
    align-items: center;
    gap: 5px;
    color: var(--color3);
    font-size: 14px;
    font-weight: 400;
    margin-top: 5px;
    margin-bottom: auto;

    @media (max-width: 1100px) {
      display: none;
    }
  }

  .mapAvatar {
    height: 50px;
    width: 50px;
    position: relative;

    @media (max-width: 450px) {
      height: 40px;
      width: 40px;
    }

    img {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      object-fit: cover;
      border-radius: 50%;
      height: 100%;
      width: 100%;
      border-radius: 50%;
    }
  }

  .gameInfoWrapper {
    display: flex;
    align-items: center;
    gap: 50px;
    padding: 20px;

    @media (max-width: 450px) {
      gap: 10px;
      justify-content: space-between;
      padding: 20px 1rem;
    }
  }

  .gameInfoItem {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .gameInfoContent {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .label1 {
    font-size: 14px;
  }

  .label2 {
    font-size: 12px;
    color: var(--color2);
    font-weight: 400;
  }

  .settingsAvatar {
    background-color: #262626;
    border-radius: 50%;
    height: 50px;
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 450px) {
      height: 40px;
      width: 40px;
    }
  }

  .userResultSection {
    display: flex;
    flex-direction: column;
    user-select: none;
    cursor: pointer;

    @media (max-width: 1100px) {
      display: flex;
      align-items: flex-start;
      justify-content: center;
    }
  }

  .hideOnSmall {
    @media (max-width: 800px) {
      display: none;
    }
  }
`

export default StyledLeaderboardCard
