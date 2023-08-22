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
  height: 100%;
  width: 100%;
  background-color: #121212;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  background: linear-gradient(360deg, rgba(25, 26, 27, 0) 0%, rgb(12 13 15 / 57%) 47.4%, #00274e 100%);
  background: linear-gradient(360deg, rgba(25, 26, 27, 0) 0%, rgb(8 8 8 / 57%) 47.4%, #000 100%);

  .results-card {
    /* max-width: 550px; */
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
      height: 56px;
      width: 180px;
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
      height: 56px;
      width: 56px;
      background-color: #202020;
      color: #959595;
      border: 1px solid rgba(255, 255, 255, 0.05);

      &:hover {
        background-color: #282828;
      }

      svg {
        height: 24px;
      }
    }
  }

  .pointsWrapper {
    font-size: 20px;
    font-weight: 500;
    color: #8a8a8a;

    span {
      color: #fff;
    }

    @media (max-width: 600px) {
      font-size: 18px;
    }
  }

  .progress-bar {
    margin-top: 10px;
    margin-bottom: 24px;
    max-width: 525px;
    width: 100%;
  }
`

export default StyledStandardFinalResults
