import styled from 'styled-components'

const StyledFinalResultsCard = styled.div`
  margin: -20px 50px 0 50px;
  max-width: 1362px;
  width: 100%;
  z-index: 1;
  background-color: #121212;
  border-radius: 12px;
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
    padding: 25px;

    @media (max-width: 600px) {
      padding: 25px 16px;
    }

    .contentGrid {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
      width: 500px;

      .textWrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;
        color: #808080;
        font-size: 20px;

        @media (max-width: 600px) {
          gap: 30px;
        }

        .finishedMsg {
          font-size: 24px;

          @media (max-width: 600px) {
            font-size: 20px;
            text-align: center;
          }
        }

        .pointsWrapper {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 20px;

          @media (max-width: 600px) {
            font-size: 18px;
          }

          .totalPoints {
            color: #bebebe;
          }
        }
      }
    }
  }
`

export default StyledFinalResultsCard
