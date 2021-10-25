import styled from 'styled-components'

const StyledSelect = styled.div`
  select {
    border: var(--border);
    width: 150px;
    height: 35px;
    border-radius: 4px;
    color: #fff;
    padding: 0 10px;
    background-color: transparent;
  }

  option {
    background-color: var(--background2);
  }
`

export default StyledSelect