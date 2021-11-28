import styled from 'styled-components'

const StyledSearchOverlayCard = styled.div`
  
  .searchOverlayCard {
    width: calc(100% + 4px);
    background-color: var(--background3);
    color: var(--color3);
    border-radius: 5px;
    position: absolute;
    top: 45px;
    left: -2px;
    z-index: 9999999;
    pointer-events: all;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
    border: 2px solid #2F3133;
  }

  .searchOverlayBody {
    display: grid;
    gap: 10px;
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
`

export default StyledSearchOverlayCard
