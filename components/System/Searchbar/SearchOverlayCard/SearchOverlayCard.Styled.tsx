import styled from 'styled-components'

const StyledSearchOverlayCard = styled.div`
  

  .searchOverlayCard {
    width: 500px;
    background-color: var(--background3);
    color: var(--color3);
    border-radius: 5px;
    position: fixed;
    top: 59px;
    left: 300px;
    z-index: 9999999;
    pointer-events: all;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border: var(--border);
  }

  .searchOverlayBody {
    display: grid;
    gap: 10px;
    padding: 15px;
  }

  .seeAllResults {
    height: 40px;
    border-top: var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #8D8F92;
    cursor: pointer;
  }

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

export default StyledSearchOverlayCard
