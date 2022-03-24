import styled from 'styled-components'

const StyledNavbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  height: 50px;
  position: sticky;
  top: 0;
  z-index: 20;
  background-color: #18181b;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.9), 0 0px 2px rgba(0, 0, 0, 0.9);

  .appTitle {
    font-size: 1.25rem;
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
    gap: 15px;
  }

  .userInfo {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .username {
    color: #BEC3C9;
    font-size: 18px;

    @media (max-width: 800px) {
      font-size: 1rem;
    }

    @media (max-width: 500px) {
      display: none;
    }
  }

  .mobileSearch {
    display: none;
    padding: 0.25rem;
    position: relative;

    @media (max-width: 700px) {
      display: block;

      :hover {
        background-color: #444;
      }
    }
  }

  .cancelSearch {
    margin-left: 1rem;
    font-size: 14px;
    color: #9ca3af;
  }
`

export default StyledNavbar
