import styled from 'styled-components'

type StyledProps = {
  isFocused: boolean
}

const StyledSearchbar = styled.div<StyledProps>`
  max-width: 450px;
  width: 100%;
  
  .searchbarWrapper {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 10px;
    width: 100%;
    height: 40px;
    border-radius: 4px;
    background-color: ${({ isFocused }) => isFocused ? 'var(--background3)' : 'var(--background4)'};
    color: var(--color4);
    box-shadow: ${({ isFocused }) => isFocused && '0 0 0 2px #8054ff'};
    transition: background-color 240ms, box-shadow 240ms;
  }

  input {
    color: var(--color4);
    width: 100%;
    z-index: 99999999999999;
    pointer-events: all;
    height: 100%;
    background-color: inherit;

    ::placeholder {
      color: var(--color4);
    }
  }
`

export default StyledSearchbar