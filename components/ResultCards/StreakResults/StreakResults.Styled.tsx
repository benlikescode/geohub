import styled from 'styled-components'

const StyledResultsCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 30px;

  .result-wrapper {
    display: grid;
    gap: 20px;
    text-align: center;

    .correct-country {
      font-size: 18px;
      font-weight: 600;
      color: #ababab;
      display: flex;
      gap: 6px;

      @media (max-width: 600px) {
        font-size: 18px;
      }

      img {
        height: 16px;
      }

      .answer-label {
        display: flex;
        align-items: center;
        gap: 6px;

        img {
          height: 16px;
        }
      }
    }

    .streak-count {
      font-size: 16px;
      color: #808080;
    }
  }

  .noGuessMessage {
    font-size: 16px;
    color: #6b6b6b;
  }

  .actionButtons {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-top: 30px;
  }
`

export default StyledResultsCard
