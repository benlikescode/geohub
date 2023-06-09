import styled from 'styled-components'

type StyledProps = {
  isFocused: boolean
  isSmall?: boolean
}

const StyledSearchbar = styled.div<StyledProps>`
  max-width: 450px;
  width: 100%;
  position: relative;

  .searchbarWrapper {
    display: flex;
    align-items: center;
    width: 100%;
    height: ${({ isSmall }) => (isSmall ? 30 : 38)}px;
    border-radius: 6px;
    background-color: ${({ theme }) => theme.color.gray[800]};
    color: rgba(206, 206, 206, 0.6);
    transition: background-color 100ms, box-shadow 100ms;
    box-shadow: ${({ isFocused, theme }) => isFocused && `0 0 0 2px ${theme.color.brand}`};
    border: 1px solid ${({ theme }) => theme.color.gray[700]};
  }

  input {
    color: #d1d1d1;
    width: 100%;
    pointer-events: all;
    height: 100%;
    background: transparent;
    font-weight: 400;
    margin-left: 10px;
    border-radius: 6px;

    ::placeholder {
      color: ${({ theme }) => theme.color.gray[600]};
      font-weight: 400;
    }
  }

  .searchBtn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 0 1rem;
    transition: 0.2s;
    background-color: ${({ theme }) => theme.color.gray[800]};
    border-left: 1px solid ${({ theme }) => theme.color.gray[700]};
    border-radius: 0 6px 6px 0;

    svg {
      height: 20px;
      width: 20px;
      color: rgba(206, 206, 206, 0.6);

      path {
        stroke-width: 1.5;
      }
    }

    &:hover {
      background-color: ${({ theme }) => theme.color.gray[700]};
    }
  }
`

export default StyledSearchbar
