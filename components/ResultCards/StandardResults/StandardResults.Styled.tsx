import styled from 'styled-components'

type StyledProps = {
  showPoints?: boolean
}

const StyledStandardResults = styled.div<StyledProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 30px;

  .pointsWrapper {
    font-size: 20px;
    font-weight: 600;
    font-style: italic;
    letter-spacing: 1px;
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
  }
`

export default StyledStandardResults
