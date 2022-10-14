import styled from 'styled-components'

type StyledProps = {}

const StyledMarker = styled.div<StyledProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  //background-color: #000;
  border: 3px solid #fff;
  border-radius: 100%;
  transform: translate(-50%, -50%);
  //pointer-events: none !important;
  //background-color: red !important;

  &:hover {
    transform: translate(-50%, -50%) scale(1.05);
  }

  .actual-marker {
    height: 26px;
    width: 26px;
    background-color: #29292e;
    border-radius: 50%;
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font: bold 16px Helvetica, Verdana, Tahoma;

    svg {
      height: 16px;
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
