import styled from 'styled-components'

const StyledLayout = styled.div`
  min-height: 100vh;

  .appBody {
    display: grid;
    grid-template-columns: var(--sidebarWidth) auto;
    min-height: 100vh;
    padding-top: var(--navbarHeight);

    @media (max-width: 1000px) {
      grid-template-columns: 185px auto;
    }

    @media (max-width: 800px) {
      grid-template-columns: 57px auto;
    }

    @media (max-width: 600px) {
      grid-template-columns: auto;
      min-height: calc(100vh - var(--navbarHeight) - var(--mobileNavHeight));
    }
  }

  .sidebarWrapper {
    @media (max-width: 600px) {
      display: none;
    }
  }

  main {
    position: relative;
  }

  .mainContent {
    max-width: var(--mainMaxWidth);
    width: 100%;
    padding: 3.5rem;
    margin: 0 auto;
    height: 100%;

    @media (max-width: 500px) {
      padding: 3rem 1rem;
    }
  }
`

export default StyledLayout
