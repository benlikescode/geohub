import styled from 'styled-components'

const StyledResultsCard = styled.div`
  margin-top: -20px;
  max-width: 1560px;
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

  .resultsWrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 25px;

    .contentGrid {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
      padding-top: 1rem;

      .textWrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;
        color: #808080;

        @media (max-width: 600px) {
          gap: 40px;
        }

        .distanceMessage {
          font-size: 20px;

          @media (max-width: 600px) {
            font-size: 18px;
            text-align: center;
          }
        }

        .pointsWrapper {
          font-size: 20px;

          @media (max-width: 600px) {
            font-size: 18px;
          }

          .points {
            background-color: #333;
            padding: 0.5rem;
            border-radius: 0.5rem;
            margin-left: 0.5rem;
            font-size: 1rem;
            color: #d1d1d1;
          }
        }
      }
    }
  }

  .emphasisText {
    color: #d1d1d1;
  }
`

export default StyledResultsCard
