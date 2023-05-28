import styled from 'styled-components'

type StyledProps = {
  isActive: boolean
}

const StyledItem = styled.div<StyledProps>`
  border-radius: 4px;
  background-color: ${({ isActive }) => (isActive ? 'var(--indigo-800)' : 'transparent')};

  &:hover {
    ${({ isActive }) =>
      !isActive &&
      `
        background-color: #333;
        
        .item {
          color: var(--color2);

          svg {
            color: #aeb1b5;
          }
        }
    `}
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  .item {
    background-color: transparent;
    color: ${({ isActive }) => (isActive ? '#fff' : '#8b8f93')};
    padding: 6px;
    display: flex;
    align-items: center;
    cursor: pointer;
    width: 100%;
    position: relative;

    @media (max-width: 1200px) {
      justify-content: center;
    }

    svg {
      height: 22px;
      color: ${({ isActive }) => (isActive ? '#fff' : '#555')};

      @media (max-width: 1200px) {
        height: 22px;
      }
    }
  }

  .item-text {
    margin-top: 2px;
    font-weight: 400;
    font-size: 14px;
    margin-left: 8px;

    @media (max-width: 1200px) {
      display: none;
    }
  }

  @media (max-width: 600px) {
    background-color: transparent;

    .item {
      svg {
        height: 30px;
        path {
          stroke-width: 1.5px;
        }
      }
    }

    &:hover {
      background-color: transparent;

      .item {
        color: ${({ isActive }) => (isActive ? '#fff' : '#8b8f93')};

        svg {
          color: ${({ isActive }) => (isActive ? '#fff' : '#555')};
        }
      }
    }
  }
`

export default StyledItem
