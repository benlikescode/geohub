import styled from 'styled-components'

type StyledProps = {
  isFocused: boolean
}

const StyledSearchbar2 = styled.div<StyledProps>`
  max-width: 400px;
  width: 100%;
  position: relative;

  .searchbarWrapper {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 10px;
    width: 100%;
    height: 38px;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.15);    
    color: rgba(255, 255, 255, 0.6);
    transition: background-color 240ms, box-shadow 240ms;
    border: 1px solid rgba(255, 255, 255, 0.15);
  }

  input {
    color: rgba(255, 255, 255, 0.6);
    width: 100%;
    pointer-events: all;
    height: 100%;
    background: transparent;  
    font-weight: 400;

    ::placeholder {
      color: rgba(255, 255, 255, 0.6);
      font-weight: 400;
    }
  }
`

export default StyledSearchbar2