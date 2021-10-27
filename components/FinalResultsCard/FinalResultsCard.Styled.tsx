import styled from 'styled-components'

const StyledFinalResultsCard = styled.div`
  margin: -20px 50px 0 50px;
  max-width: var(--maxWidth);
  width: 100%;
  z-index: 1;

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
    gap: 25px;
    width: 500px;
  }

  .textWrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    color: #D9D9D9;
  }

  .pointsWrapper {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 20px;
  }

  .distanceMessage {
    font-size: 24px;
  }

  .emphasisText {
    color: #fff;
  }
  
`

export default StyledFinalResultsCard
