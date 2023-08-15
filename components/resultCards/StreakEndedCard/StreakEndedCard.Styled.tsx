import styled from 'styled-components'

type StyledProps = {}

const StyledStreakEndedCard = styled.div<StyledProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 12px;
  padding: 30px;
  width: 100%;
  height: 100%;
  /* background-color: #121212; */
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  /* background: linear-gradient(360deg, rgba(25, 26, 27, 0) 0%, rgb(12 13 15 / 57%) 47.4%, #00274e 100%); */
  background: linear-gradient(360deg, rgba(25, 26, 27, 0) 0%, rgb(8 8 8 / 57%) 47.4%, #0e0e0e 100%);

  .result-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .correct-country {
      font-size: 18px;
      font-weight: 600;
      color: #ababab;

      img {
        height: 14px;
        margin: 0 6px;
      }
    }

    .streak-summary-count {
      font-size: 16px;
      color: #a2a2a2;
      font-weight: 400;
    }

    .streak-count {
      font-size: 16px;
      color: #808080;
      font-weight: 400;
      text-align: center;
      margin-top: 20px;
      margin-bottom: 40px;
    }

    .country-list {
      margin: 24px 0;
      border-bottom: 1px solid #333;
      padding-bottom: 16px;
      width: 100%;
    }
  }

  .buttons-wrapper {
    display: flex;
    align-items: center;
    gap: 25px;

    .side-button {
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 8px;
      font-size: 10px;
      text-transform: uppercase;
      color: #686868;
    }

    .play-again-btn {
      border-radius: 50rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      height: 60px;
      padding: 0 40px;
      font-size: 18px;
      font-weight: 400;
      user-select: none;
      background-color: var(--mediumPurple);
      color: #fff;

      :hover {
        background-color: var(--indigo-600);
      }
    }

    .view-summary-btn {
      border-radius: 50rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      height: 60px;
      padding: 0 40px;
      font-size: 18px;
      font-weight: 400;
      user-select: none;
      background-color: #282828;
      color: #fff;

      :hover {
        background-color: #333;
      }
    }

    .results-btn,
    .map-btn {
      border-radius: 50rem;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 60px;
      width: 60px;
      background-color: #282828;
      color: #fff;
      border: 1px solid rgba(255, 255, 255, 0.05);

      &:hover {
        background-color: #333;
      }

      svg {
        height: 24px;
      }
    }
  }
`

export default StyledStreakEndedCard
