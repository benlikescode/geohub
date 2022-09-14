import styled from 'styled-components'

type StyledProps = {
  isFocused: boolean
  isSmall?: boolean
}

const StyledSearchbar = styled.div<StyledProps>`
  max-width: 500px;
  width: 100%;
  position: relative;

  .searchbarWrapper {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    height: ${({ isSmall }) => (isSmall ? 30 : 34)}px;
    border-radius: 3px;
    background: #121313;
    color: rgba(206, 206, 206, 0.6);
    transition: background-color 100ms, box-shadow 100ms;
    box-shadow: ${({ isFocused }) => isFocused && '0 0 0 2px var(--mediumPurple)'};
    border: 1px solid #353839;
  }

  input {
    color: #d1d1d1;
    width: 100%;
    pointer-events: all;
    height: 100%;
    background: transparent;
    font-weight: 400;
    margin-left: 10px;
    border-radius: 3px;

    ::placeholder {
      color: #616161;
      font-weight: 400;
    }
  }

  .searchBtn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 0 1rem;
    background-color: #212424;
    border-left: 1px solid #353839;
    border-radius: 0 3px 3px 0;
  }
`

export default StyledSearchbar
