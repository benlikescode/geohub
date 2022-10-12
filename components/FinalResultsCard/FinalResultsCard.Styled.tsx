import styled from 'styled-components'

const StyledFinalResultsCard = styled.div`
  margin-top: -20px;
  max-width: ${({ theme }) => theme.breakpoint.l};
  width: 100%;
  z-index: 1;
  background-color: #121212;
  border-radius: 6px;
  border: 1px solid #202020;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.55);

  @media (max-width: 600px) {
    border-radius: 0;
    border: none;
    margin-top: -25px;
  }

  .finalResultsWrapper {
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
  }
`

export default StyledFinalResultsCard
