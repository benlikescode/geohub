import styled from 'styled-components'

type StyledProps = {
  mapHeight: number
  mapWidth: number
  mobileMapOpen?: boolean
}

const StyledGuessMap = styled.div<StyledProps>`
  .guessMapWrapper {
    position: absolute;
    bottom: 20px;
    right: 20px;
    z-index: 3;
    display: flex;
    flex-direction: column;
    gap: 10px;

    @media (max-width: 600px) {
      display: none;

      ${({ mobileMapOpen }) =>
        mobileMapOpen &&
        `
          display: flex;
          height: 50vh;
          width: 100%;
          bottom: 0;
          right: 0;
          background-color: var(--background1);
          gap: 0;
      `}
    }
  }

  .map {
    height: ${({ mapHeight }) => mapHeight}vh;
    width: ${({ mapWidth }) => mapWidth}vw;
    opacity: ${({ mapWidth }) => (mapWidth === 300 ? 0.5 : 1)};
    border-radius: 4px;
    transition: opacity 0.1s ease, width 0.1s ease, height 0.1s ease;

    @media (max-width: 600px) {
      height: 100%;
      width: 100%;
      border-radius: 0;
    }
  }

  .controls {
    display: flex;
    align-items: center;
    gap: 5px;

    @media (max-width: 600px) {
      display: none;
    }
  }

  .controlBtn {
    height: 24px;
    width: 24px;
    background: var(--background1);
    border-radius: 50%;
  }

  .disabled {
    opacity: 0.5;
    cursor: default;
  }

  .close-map-button {
    display: none;

    @media (max-width: 600px) {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 10px;
      right: 10px;
      background-color: var(--background2);
      height: 32px;
      width: 32px;
      border-radius: 50%;
      border: 1px solid var(--background1);
    }

    svg {
      height: 20px;
      color: var(--color2);
    }
  }

  .submit-button-wrapper {
    @media (max-width: 600px) {
      padding: 10px;
    }
  }
`

export default StyledGuessMap
