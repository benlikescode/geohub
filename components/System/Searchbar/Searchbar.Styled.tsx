import styled from 'styled-components'

const StyledSearchbar = styled.div`
  height: 30px;
  border-radius: 4px;
  background-color: #515151;
  color: #BABABA;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 10px;

  input {
    background-color: #515151;
    color: #BABABA;
    ::placeholder {
      color: #BABABA;
    }
  }
`

export default StyledSearchbar