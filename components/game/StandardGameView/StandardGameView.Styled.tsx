import styled from 'styled-components'

type StyledProps = {}

const StyledStandardGameView = styled.div<StyledProps>`
  height: 100%;
  width: 100%;
  .play-wrapper {
    height: 100%;
    width: 100%;
  }

  .results-wrapper {
    height: 100%;
    width: 100%;
    /* position: fixed;
    inset: 0; */
    background-color: #0e0e0e;

    .results-card-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`

export default StyledStandardGameView
