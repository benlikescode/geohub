import styled from 'styled-components'

const StyledMap = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  

  .map {
    position: relative;
    height: 400px;
    width: 600px;
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
