import styled from 'styled-components'

type StyledProps = {
  mapHeight: number
  mapWidth: number
}

const StyledMap2 = styled.div<StyledProps>`
  .guessMapWrapper {
    position: absolute;
    bottom: 20px;
    right: 20px;
    z-index: 2;
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

  .controlBtn {
    height: 24px;
    width: 24px;
    background: var(--background1);
    border-radius: 50%;
  }
`

export default StyledMap2
