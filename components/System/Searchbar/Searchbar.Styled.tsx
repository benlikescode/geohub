import styled from 'styled-components'

const StyledSearchbar = styled.div`
  height: 30px;
  border-radius: 4px;
  background-color: var(--background3);
  color: var(--color2);
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 10px;

  input {
    background-color: var(--background3);
    color: var(--color2);
    ::placeholder {
      color: var(--color2);
    }
  }
`

export default StyledSearchbar