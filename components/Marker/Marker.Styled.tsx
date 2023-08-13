import styled from 'styled-components'

type StyledProps = {
  type: 'guess' | 'actual'
}

const StyledMarker = styled.div<StyledProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  //background-color: #000;

  transform: translate(-50%, -50%);
  //pointer-events: none !important;
  //background-color: red !important;

  img {
    height: 32px;
    width: 32px;
    border-radius: 50%;
    position: relative;
    border: 2px solid #fff;
  }

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

    /*
    .round-number {
      height: 14px;
      width: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #ffffff;
      color: #000;
      font-weight: bold;
      border-radius: 50%;
      position: absolute;
      bottom: -3px;
      right: -3px;
    }
    */
  }
`

export default StyledMarker
