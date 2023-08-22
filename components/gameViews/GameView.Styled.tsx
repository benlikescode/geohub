import styled from 'styled-components'

const StyledGameView = styled.div`
  height: 100%;
  width: 100%;

  .play-wrapper {
    height: 100%;
    width: 100%;
  }

  .results-wrapper {
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-rows: calc(100% - 250px);

    .results-card-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .back-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    background-color: var(--background2);
    padding: 8px;
    border-radius: 4px;
    position: absolute;
    top: 8px;
    left: 8px;
    color: #dcdcdc;
    font-size: 15px;
    font-weight: 400;
    cursor: pointer;

    &:hover {
      background-color: #282828;
      color: #fff;
    }

    svg {
      height: 22px;
      margin-left: -4px;
    }
  }
`

export default StyledGameView
