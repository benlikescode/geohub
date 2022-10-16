import styled from 'styled-components'

const StyledGamePage = styled.div`
  .resultsWrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .round-survey-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;

    .round-survey {
      background-color: var(--background2);
      padding: 2rem;
      border-radius: 6px;
      width: fit-content;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;

      .round-survey-title {
        font-size: 2rem;
      }

      .survey-buttons-wrapper {
        display: flex;
        align-items: center;
        gap: 2rem;
      }
    }
  }

  .loading-screen {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
`

export default StyledGamePage
