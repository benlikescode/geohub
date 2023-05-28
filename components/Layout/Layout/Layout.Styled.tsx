import styled from 'styled-components'

const StyledLayout = styled.div`
  .app-layout {
    overflow: hidden;
    height: 100vh;
    position: relative;
  }

  .app-body {
    display: flex;
    width: 100%;
    overflow: hidden;
  }

  main {
    width: 100% !important;
    height: calc(100vh - var(--navbarHeight));
    max-height: 100%;
    position: relative;
    overflow: hidden auto;
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
