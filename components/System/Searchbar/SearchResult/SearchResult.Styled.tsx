import styled from 'styled-components'

const StyledSearchResult = styled.div`
  border-radius: 3px;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: 400;

  :hover {
    background-color: #313131;
  }

  .linkWrapper {
    height: 100%;
    width: 100%;
    padding: 8px 15px;
  }
  
`

export default StyledSearchResult
