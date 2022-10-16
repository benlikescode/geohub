import styled from 'styled-components'

type StyledProps = {
  showMap?: boolean
}

const StyledStreetView = styled.div<StyledProps>`
  #map {
    height: 100vh;
    width: 100%;
    position: relative;
    display: none;

    ${({ showMap }) =>
      showMap &&
      `
      display: block
    `}
  }

  .toggle-map-button {
    display: none;

    @media (max-width: 600px) {
      display: block;
      background-color: var(--mediumPurple);
      border: 2px solid var(--color2);
      height: 60px;
      width: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      bottom: 92px;
      right: 20px;
      z-index: 2;

      svg {
        height: 30px;
        color: var(--color2);
      }
    }
  }
`

export default StyledStreetView
