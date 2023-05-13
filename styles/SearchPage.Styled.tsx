import styled from 'styled-components'

const StyledSearchPage = styled.div`
  .filter-tab {
    display: flex;
    align-items: center;
    font-size: 16px;

    svg {
      height: 20px;
      color: #737373;
      margin-left: 6px;
    }

    span {
      position: relative;
      top: 1px;
    }

    .result-count-bubble {
      background-color: #262626;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 8px;
      color: #7e7e7e;
      font-size: 12px;
      height: 18px;
      width: 24px;
    }
  }

  .search-results-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;

    .search-result {
      display: flex;
      align-items: center;
      gap: 1rem;
      background-color: #222;
      padding: 0.75rem;
      border-radius: 4px;

      /* &:not(:first-child) {
      margin-top: 1rem;
    } */

      &:hover {
        background-color: #282828;
        box-shadow: 0 0 0 1px #333;
      }
    }

    .no-search-results {
      font-size: 18px;
      color: #efeff1;
      font-weight: 400;
      margin-top: 1rem;

      span {
        font-weight: 500;
      }
    }

    .num-search-results {
      font-size: 1rem;
      color: var(--color3);
      font-weight: 500;
    }
  }
  //REMOVE LATER
  .lm {
    display: flex;
    align-items: center;
    border-bottom: 2px solid #404040;
    gap: 16px;
    margin-bottom: 25px;
  }

  .page-title {
    font-size: 20px;
    font-weight: 600;
    color: #d6d6d6;
    border-right: 1px solid #2e2e2e;
    padding-right: 16px;
  }
`

export default StyledSearchPage
