import styled from 'styled-components'

const StyledSearchbar = styled.div`
  height: 40px;
  border-radius: 4px;
  background-color: var(--background4);
  color: var(--color4);
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 10px;
  width: 350px;

  input {
    background-color: var(--background4);
    color: var(--color4);

    ::placeholder {
      color: var(--color4);
    }
  }
`

export default StyledSearchbar