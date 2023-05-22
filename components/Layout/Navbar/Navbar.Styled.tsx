import styled from 'styled-components'

const StyledNavbar = styled.div`
  height: var(--navbarHeight);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  padding: 0 1rem;
  //position: sticky;
  //top: 0;
  z-index: 20;
  background-color: ${({ theme }) => theme.color.gray[900]};
  border-bottom: 1px solid ${({ theme }) => theme.color.gray[800]};
  flex-shrink: 0 !important;

  .appTitle {
    font-size: 1.125rem;
    font-weight: 600;

    @media (max-width: 800px) {
      font-size: 1rem;
    }
  }

  .leftContainer {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-grow: 1;
    width: 100%;
    height: 100%;

    @media (max-width: 500px) {
      flex-shrink: 3;
    }
  }

  .middleContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 2;
    width: 100%;

    @media (max-width: 700px) {
      display: none;
    }
  }

  .rightContainer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-grow: 1;
    width: 100%;
  }

  .navLinks {
    display: flex;
    align-items: center;
    margin-left: 2rem;
    height: 100%;
  }

  .rightWrapper {
    display: flex;
    align-items: center;
    gap: 8px;

    .mobile-search {
      display: none;

      @media (max-width: 700px) {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.25rem;
        border-radius: 5px;
        user-select: none;
        background-color: transparent;

        :hover {
          background-color: #444;
        }
      }

      svg {
        height: 20px;
        color: #efeff1;

        path {
          stroke-width: 1.5;
        }
      }
    }
  }

  .userInfo {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .username {
    color: #bec3c9;
    font-size: 16px;

    @media (max-width: 800px) {
      font-size: 1rem;
    }

    @media (max-width: 500px) {
      display: none;
    }
  }

  .cancelSearch {
    margin-left: 1rem;
    font-size: 14px;
    color: #9ca3af;
    cursor: pointer;
  }

  a button {
    font-size: 15px;
    border-radius: 5px;
  }

  @media (max-width: 600px) {
    position: fixed;
    background-color: #0e0e0e;
  }
`

export default StyledNavbar
