import styled from 'styled-components'

type StyledProps = {}

const StyledMarker = styled.div<StyledProps>`
  .marker {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 18px;
    height: 18px;
    background-color: #000;
    border: 2px solid #fff;
    border-radius: 100%;
    user-select: none;
    transform: translate(-50%, -50%);

    &:hover {
      z-index: 1;
    }
  }
`

export default StyledMarker
