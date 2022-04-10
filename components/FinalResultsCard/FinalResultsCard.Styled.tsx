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

  .finalResultsWrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 25px;
  }

  .contentGrid {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    width: 500px;
  }

  .textWrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    color: #808080;
    font-size: 1.25rem;
  }

  .pointsWrapper {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1.25rem;
  }

  .distanceMessage {
    font-size: 24px;
  }

  .emphasisText {
    color: #fff;
  }

  .totalPoints {
    color: #bebebe;
  }

  .finishedMsg {
    font-size: 1.5rem;
  }
`

export default StyledFinalResultsCard
