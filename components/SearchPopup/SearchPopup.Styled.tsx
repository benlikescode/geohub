import styled from 'styled-components'

type StyledProps = {
  
}

const StyledSearchPopup = styled.div<StyledProps>`
  .layerContainer {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: none!important;
    pointer-events: none;
    z-index: 99;
  }

  .modal { 
    width: 100%;
    position: fixed;
    top: 50px;
    z-index: 99;
    pointer-events: all;
    border-radius: 5px;
  }
  
  .backdrop {
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

export default StyledSearchPopup