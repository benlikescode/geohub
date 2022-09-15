import styled from 'styled-components'

const StyledSearchResult = styled.div`
  display: flex;
  align-items: center;
  font-weight: 400;
  cursor: pointer;

  :hover {
    background-color: #282828;
  }

  .linkWrapper {
    height: 100%;
    width: 100%;
    padding: 1rem;
  }

  .termAvatar {
    height: 32px;
    width: 32px;
    border-radius: 50%;
    //background-color: #333;
    //box-shadow: 0 0 0 1px #0e0e10;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .searchResultLabel {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

export default StyledSearchResult
