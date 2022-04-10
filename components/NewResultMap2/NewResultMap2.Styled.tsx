import styled from 'styled-components'

type StyledProps = {
  
}

const StyledNewResultMap2 = styled.div<StyledProps>`
  .markerNumbered {
    height: 30px;
    width: 30px;
    position: relative;
    border: 1px solid #fff;
    border-radius: 50%;
    
    img {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      object-fit: cover;
      border-radius: 50%;
      height: 100%;
      width: 100%;
    }
  }

  .roundNumber {
    height: 14px;
    width: 14px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: #fff;
    border: 1px solid #b4b4b4;

    span {
      font-size: 10px;
      color: #0f0f0f;
    }
  }

  .userMarker {
    height: 30px;
    width: 30px;
    border: 2px solid #fff;
    border-radius: 50%;
  }
`

export default StyledNewResultMap2