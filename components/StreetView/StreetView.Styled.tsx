import styled from 'styled-components'

type StyledProps = {
  showMap?: boolean
}

const StyledStreetView = styled.div<StyledProps>`
  height: 100%;
  width: 100%;

  #streetview {
    height: 100%;
    width: 100%;
  }

  #streetview > div.gm-style > div:nth-child(2) > div:nth-child(1) > div:nth-child(9) > div:nth-child(2) > div {
    filter: invert(1) !important;
  }

  #streetview > div.gm-style > div:nth-child(2) > div:nth-child(1) > div:nth-child(9) > div:nth-child(1) {
    display: none;
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

  a[href^="https://maps.google.com/maps"]
  {
    pointer-events: none;
  }
`

export default StyledStreetView
