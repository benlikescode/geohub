import styled from 'styled-components'

type StyledProps = {
  type: 'guess' | 'actual'
}

const StyledMarker = styled.div<StyledProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  border: 3px solid #fff;
  border-radius: 100%;
  transform: translate(-50%, -50%);

  ${({ type }) =>
    type === 'actual' &&
    `
      &:hover {
        transform: translate(-50%, -50%) scale(1.05);
      }
  `}

  .actual-marker {
    height: 24px;
    width: 24px;
    background-color: #29292e;
    border-radius: 50%;
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font: bold 14px Helvetica, Verdana, Tahoma;

    svg {
      height: 14px;
    }
  }
`

export default StyledMarker
