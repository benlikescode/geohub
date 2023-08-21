import styled from 'styled-components'

const StyledStandardResults = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2px;
  padding: 32px 20px;
  height: 100%;
  width: 100%;
  background-color: #121212;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  background: linear-gradient(360deg, rgba(25, 26, 27, 0) 0%, rgb(12 13 15 / 57%) 47.4%, #00274e 100%);
  background: linear-gradient(360deg, rgba(25, 26, 27, 0) 0%, rgb(8 8 8 / 57%) 47.4%, #000000 100%);

  .pointsWrapper {
    font-size: 20px;
    font-weight: 600;
    color: #ababab;
  }

  .progress-bar {
    margin-top: 10px;
    margin-bottom: 16px;
    max-width: 525px;
    width: 100%;
  }

  .noGuessMessage {
    font-size: 16px;
    color: #6b6b6b;
  }

  .distanceMessage {
    font-size: 16px;
    color: #808080;

    @media (max-width: 600px) {
      font-size: 14px;
      text-align: center;
    }

    .emphasisText {
      font-weight: bold;
      color: #909090;
    }
  }

  .actionButton {
    margin-top: 30px;

    .next-round-btn {
      border-radius: 50rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      height: 50px;
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
  }
`

export default StyledStandardResults
