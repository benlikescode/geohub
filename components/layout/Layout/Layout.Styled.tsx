import styled from 'styled-components'

const StyledLayout = styled.div`
  /* overflow: hidden !important; */
  /* display: flex !important;
  flex-flow: column nowrap !important; */
  /* position: absolute !important; */
  /* inset: 0px !important; */

  .app-layout {
    overflow: hidden;
    /* display: flex;
  flex-direction: column; */
    height: 100vh;
    position: relative;
  }

  .appBody {
    display: flex;
    /* flex-direction: column; */
    width: 100%;
    overflow: hidden;
    /* display: grid;
    grid-template-columns: var(--sidebarWidth) auto; */
    /* display: flex !important;
    flex-wrap: nowrap !important;
    position: relative !important; */
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
    /* overflow: hidden auto; */
    //display: flex !important;
    //flex-direction: column !important;
    //z-index: var(--z-index-default) !important;

    height: calc(100vh - var(--navbarHeight));
    max-height: 100%;
    position: relative;
    overflow: hidden auto;
  }

  .mainContent {
    max-width: var(--mainMaxWidth);
    width: 100%;
    padding: 3.5rem;
    margin: 0 auto;
    height: 100%;

    @media (max-width: 600px) {
      padding: 1rem;
    }
  }

  @media (max-width: 600px) {
    .app-layout {
      width: 100%;
      height: unset;
      overflow: unset;
      padding: 50px 0 70px 0;
      box-sizing: border-box;
    }

    main {
      height: auto;
      overflow: unset;
    }
  }
`

export default StyledLayout
