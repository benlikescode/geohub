import styled from 'styled-components'

type StyledProps = {}

const StyledAppLogo = styled.div<StyledProps>`
  .logo {
    user-select: none;
    display: flex;
    position: relative;
    width: fit-content;
    transition: 0.2s;

    .earth {
      position: absolute;
      left: 28px;
      top: -7.5px;
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
