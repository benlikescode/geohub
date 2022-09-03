import 'mapbox-gl/dist/mapbox-gl.css'

import styled from 'styled-components'

type StyledProps = {
  mapHeight?: number
  mapWidth?: number
}

const StyledGuessMap = styled.div<StyledProps>`
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .userMarker {
    height: 30px;
    width: 30px;
    border: 2px solid #fff;
    border-radius: 50%;
  }
  
  // removes watermark (takes too much space on guess map => already give credit on larger maps)
  .mapboxgl-ctrl-bottom-left {
    display: none;
  }

  .controls {
    display: flex;
    align-items: center;
    gap: 5px;  
  }

  .controlBtn {
    height: 24px;
    width: 24px;
    background: var(--background1);
    border-radius: 50%;
  }

  .disabled {
    opacity: 0.5;
    cursor: default;
  }
`

export default StyledGuessMap
