import styled from 'styled-components'

type StyledProps = {}

const StyledAppLogo = styled.div<StyledProps>`
  .logo {
    user-select: none;
    display: flex;
    position: relative;
    width: fit-content;
    transition: 0.2s;

    img {
      position: absolute;
      object-fit: cover;
      width: 34px;
      height: 34px;
      top: -7.5px;
      left: 28px;
      pointer-events: none;
      transition: 0.2s;
    }

    svg {
      pointer-events: none;
      height: 18px;
    }

    &:hover {
      cursor: pointer;
      opacity: 0.7;

      .earth {
        transform: scale(1.1);
      }
    }
  }
`

export default StyledAppLogo
