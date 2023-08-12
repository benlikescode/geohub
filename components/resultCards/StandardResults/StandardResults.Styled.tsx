import styled from 'styled-components'

type StyledProps = {
  showPoints?: boolean
}

const StyledStandardResults = styled.div<StyledProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2px;
  padding: 20px;
  height: 250px;
  width: 100%;
  background-color: #121212;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  background: linear-gradient(360deg, rgba(25, 26, 27, 0) 0%, rgb(12 13 15 / 57%) 47.4%, #00274e 100%);
  background: linear-gradient(360deg, rgba(25, 26, 27, 0) 0%, rgb(8 8 8 / 57%) 47.4%, #000000 100%);

  .pointsWrapper {
    font-size: 20px;
    font-weight: 600;
    color: #ababab;
    opacity: 0;
    transform: translateY(3rem) scale(0.5);
    transition: opacity 0.6s linear, transform 0.6s ease;
    transition-delay: 0.3s;

    @media (max-width: 600px) {
      font-size: 18px;
    }

    ${({ showPoints }) =>
      showPoints &&
      `
            opacity: 1;
            transform: translateY(0) scale(1);
        `}
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
