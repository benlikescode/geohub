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
    position: relative;
    height: ${({ mapHeight }) => mapHeight ? mapHeight : '400'}px;
    width: ${({ mapWidth }) => mapWidth ? mapWidth : '600'}px;
    opacity: ${({ mapHeight }) => mapHeight === 200 ? 0.5 : 1};
  }

  .controls {
    position: absolute;
    top: 0;
    left: 0;
  }

  img[src="https://www.geoguessr.com/images/auto/30/30/ce/0/plain/pin/5683bfb6646c1a1089483512d66e70d5.png"] {
    
    border-radius: 50%;
   
  }
`

export default StyledMap
