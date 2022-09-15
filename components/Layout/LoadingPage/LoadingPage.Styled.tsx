import styled from 'styled-components'

const StyledLoadingPage = styled.div`
  min-height: 100vh;

  .appBody {
    display: grid;
    grid-template-columns: var(--sidebarWidth) auto;
    min-height: calc(100vh - var(--navbarHeight));

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
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export default StyledLoadingPage
