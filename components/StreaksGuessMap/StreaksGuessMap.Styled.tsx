import styled from 'styled-components'

type StyledProps = {
  mapHeight: number
  mapWidth: number
  mobileMapOpen?: boolean
}

const StyledStreaksGuessMap = styled.div<StyledProps>`
  .guessMapWrapper {
    position: absolute;
    bottom: 20px;
    right: 20px;
    z-index: 3;

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
    position: relative;
    margin-bottom: 10px;

    @media (max-width: 600px) {
      height: 100%;
      width: 100%;
      border-radius: 0;
    }

    .selected-country {
      position: absolute;
      bottom: 10px;
      left: 10px;
      background-color: rgba(0, 0, 0, 0.8);
      border-radius: 4px;
      padding: 6px 10px;
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 14px;

      img {
        height: 16px;
      }
    }
  }

  .controls {
    display: flex;
    align-items: center;
    gap: 6px;
    background-color: rgba(0, 0, 0, 0.5);
    width: fit-content;
    padding: 6px;
    border-radius: 4px 4px 0 0;

    @media (max-width: 600px) {
      display: none;
    }
  }

  .controlBtn {
    height: 20px;
    width: 20px;
    /* background: var(--background1); */
    background-color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    &.increase {
      transform: rotate(-135deg);
    }

    &.decrease {
      transform: rotate(45deg);
    }

    &.disabled {
      opacity: 0.5;
      cursor: default;
    }

    svg {
      height: 12px;
      color: var(--background1);

      path {
        stroke-width: 3;
      }
    }
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

export default StyledStreaksGuessMap
