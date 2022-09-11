import styled from 'styled-components'

const StyledSearchPage = styled.div`
  .search-result {
    display: flex;
    align-items: center;
    gap: 1rem;
    background-color: #222;
    padding: 0.75rem 1rem;
    width: 300px;
    border-radius: 4px;

    &:not(:first-child) {
      margin-top: 1rem;
    }

    &:hover {
      background-color: #282828;
      box-shadow: 0 0 0 1px #333;
    }
  }

  .no-search-results {
    font-size: 1.5rem;
    color: var(--color3);
    font-weight: 400;

    span {
      font-weight: 500;
    }
  }

  .num-search-results {
    font-size: 1rem;
    color: var(--color3);
    font-weight: 500;
  }
`

export default StyledSearchPage
