import styled from 'styled-components'

type StyledProps = {
  showPoints?: boolean
}

const StyledStandardFinalResults = styled.div<StyledProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  height: 250px;
  width: 100%;
  background-color: #121212;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  background: linear-gradient(360deg, rgba(25, 26, 27, 0) 0%, rgb(12 13 15 / 57%) 47.4%, #00274e 100%);
  background: linear-gradient(360deg, rgba(25, 26, 27, 0) 0%, rgb(8 8 8 / 57%) 47.4%, #000 100%);

  .results-card {
    max-width: 550px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 8px;
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
      width: 200px;
      font-size: 18px;
      font-weight: 400;
      user-select: none;
      background-color: var(--mediumPurple);
      color: #fff;

      :hover {
        background-color: var(--indigo-600);
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

  .secondary-button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border-radius: 5px;
    height: 40px;
    padding: 0 25px;
    user-select: none;
    background-color: #222;
    border: 1px solid #252525;
    color: #fff;
    font-weight: 400;

    :hover {
      background-color: #252525;
    }
  }

  .points-wrapper {
    display: grid;
    gap: 4px;
  }

  .pointsWrapper {
    font-size: 20px;
    font-weight: 600;
    /* font-style: italic; */
    /* letter-spacing: 1px; */
    color: #ababab;

    @media (max-width: 600px) {
      font-size: 18px;
    }
  }

  .progress-bar {
    margin-top: 10px;
    margin-bottom: 16px;
    max-width: 525px;
    width: 100%;
  }

  .finishedMessage {
    font-size: 16px;
    color: #808080;
    margin-bottom: 30px;

    @media (max-width: 600px) {
      font-size: 14px;
      text-align: center;
    }
  }
`

export default StyledStandardFinalResults
