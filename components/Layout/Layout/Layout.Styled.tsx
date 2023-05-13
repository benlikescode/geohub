import styled from 'styled-components'

const StyledLayout = styled.div`
  /* overflow: hidden !important; */
  display: flex !important;
  flex-flow: column nowrap !important;
  /* position: absolute !important; */
  /* inset: 0px !important; */

  .app-layout {
    display: flex !important;
    flex-flow: column nowrap !important;
    height: 100% !important;
  }

  .appBody {
    display: flex !important;
    flex-wrap: nowrap !important;
    position: relative !important;
    /* overflow: hidden !important;
    height: 100% !important; */
    //display: grid;
    //grid-template-columns: var(--sidebarWidth) auto;
    //min-height: 100vh;
    //padding-top: var(--navbarHeight);

    /*

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

    */
  }

  /*
  .sidebarWrapper {
    @media (max-width: 600px) {
      display: none;
    }
  }
*/
  main {
    //position: relative;

    //overflow: hidden !important;
    //overflow: hidden auto;
    //position: relative !important;
    //-webkit-box-flex: 1 !important;
    //flex-grow: 1 !important;
    //height: 100% !important;
    width: 100% !important;
    overflow: hidden auto;
    height: calc(100vh - var(--navbarHeight));
    //display: flex !important;
    //flex-direction: column !important;
    //z-index: var(--z-index-default) !important;
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
