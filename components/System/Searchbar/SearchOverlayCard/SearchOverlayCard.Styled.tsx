import styled from 'styled-components'

const StyledSearchOverlayCard = styled.div`
  .searchOverlayCard {
    width: calc(100% + 4px);
    background-color: var(--background2);
    color: var(--color3);
    border-radius: 5px;
    position: absolute;
    top: 36px;
    left: -2px;
    z-index: 9999999;
    pointer-events: all;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
    border: 1px solid #2f3133;

    .searchOverlayBody {
      display: grid;
      width: 100%;

      .search-result-skeleton {
        padding: 14px;
        display: flex;
        align-items: center;
        gap: 10px;
      }
    }
  }

  .seeAllResults {
    height: 40px;
    border-top: var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #8d8f92;
    cursor: pointer;

    :hover {
      background-color: #202020;
    }
  }
`

export default StyledSearchOverlayCard
