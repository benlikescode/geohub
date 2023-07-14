import styled from 'styled-components'

type StyledProps = {
  showMap?: boolean
}

const StyledStreetView = styled.div<StyledProps>`
  height: 100vh;
  width: 100vw;
  overflow: hidden;

  iframe {
    /* pointer-events: none; */
    user-select: none;
  }

  .toggle-map-button {
    display: none;

    @media (max-width: 600px) {
      display: block;
      background-color: var(--mediumPurple);
      border: 2px solid var(--color2);
      height: 80px;
      width: 80px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      bottom: 36px;
      right: 12px;
      z-index: 2;

      svg {
        height: 40px;
        color: var(--color2);

        path {
          stroke-width: 1.5px;
        }
      }
    }
  }
`

export default StyledStreetView
