import styled from 'styled-components'

type StyledProps = {
  isActive: boolean
}

const StyledItem = styled.div<StyledProps>`
  border-radius: 4px;
  background-color: ${({ isActive }) => (isActive ? '#2f2f36' : 'transparent')};
  // #271d37 #2f2a39
  &:hover {
    background-color: ${({ isActive }) => (isActive ? '#2f2f36' : '#2a2a30')};

    .item {
      color: var(--color2);

      svg {
        color: #aeb1b5;
      }
    }
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  .item {
    background-color: transparent;
    color: ${({ isActive }) => (isActive ? 'var(--color2)' : '#8b8f93')};
    padding: 6px 8px;
    display: flex;
    align-items: center;
    cursor: pointer;
    width: 100%;

    @media (max-width: 1200px) {
      justify-content: center;
    }

    svg {
      height: 22px;
      color: ${({ isActive }) => (isActive ? '#aeb1b5' : '#555')};

      @media (max-width: 1200px) {
        height: 22px;
      }
    }
  }

  .itemText {
    margin-top: 2px;
    font-size: 14px;
    margin-left: 8px;

    @media (max-width: 1200px) {
      display: none;
    }
  }
`

export default StyledItem
