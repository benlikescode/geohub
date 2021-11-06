import styled from 'styled-components'

const StyledModal = styled.div`
  .layerContainer {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: none!important;
    pointer-events: none;
    z-index: 9999999;
  }

  .modal { 
    width: 650px;
    max-height: 700px;
    min-height: 200px;
    background-color: var(--background3);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999999;
    pointer-events: all;
    overflow: hidden;
    border-radius: 12px;
  }
  
  .backdrop {
    opacity: 0.85;
    background: rgb(0, 0, 0);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: all;
  }
  
`

export default StyledModal