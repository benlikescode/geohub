import styled from 'styled-components'

type StyledProps = {
  mapHeight: number
  mapWidth: number
}

const StyledMap = styled.div<StyledProps>`
  .guessMapWrapper {
    position: absolute;
    bottom: 20px;
    right: 20px;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .map {
    height: ${({ mapHeight }) => mapHeight}px;
    width: ${({ mapWidth }) => mapWidth}px;
    opacity: ${({ mapWidth }) => mapWidth === 300 ? 0.5 : 1};
    border-radius: 4px;
  }

  .controls {
    
    display: flex;
    align-items: center;
    gap: 5px;  
  }

  img[src="https://www.geoguessr.com/images/auto/30/30/ce/0/plain/pin/5683bfb6646c1a1089483512d66e70d5.png"] {
    border-radius: 50%;
  }

  .controlBtn {
    height: 24px;
    width: 24px;
    background: var(--background1);
    border-radius: 50%;
  }
`

export default StyledMap
