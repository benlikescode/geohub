import styled from 'styled-components'

const StyledResultsCard = styled.div`
  margin: -20px 50px 0 50px;
  max-width: var(--maxWidth);
  width: 100%;
  z-index: 1;
  background-color: #121212;
  border-radius: 12px;
  border: 1px solid #202020;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.55);
  
  .resultsWrapper {
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
    padding-top: 1rem;
  }

  .textWrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    color: #808080;
  }

  .pointsWrapper {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 20px;
  }

  .distanceMessage {
    font-size: 1.25rem;
  }

  .emphasisText {
    color: #d1d1d1;
  }

  .test {
    background-color: #333;
    padding: 0.5rem;
    border-radius: 0.5rem;
    margin-left: 0.5rem;
    font-size: 1rem;
    color: #d1d1d1;
  }
  
`

export default StyledResultsCard
