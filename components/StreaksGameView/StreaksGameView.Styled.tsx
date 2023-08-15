import styled from 'styled-components'

type StyledProps = {}

const StyledStreaksGameView = styled.div<StyledProps>`
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
    /* background-color: #121212; */
    display: grid;
    grid-template-rows: calc(100vh - 270px) auto;

    .results-card-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`

export default StyledStreaksGameView
