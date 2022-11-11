import styled from 'styled-components'

const StyledResultPage = styled.div`
  .errorContainer {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .errorContent {
    margin-top: 3rem;
  }

  .errorPageTitle {
    font-size: 60px;
    margin-bottom: 2rem;
  }

  .errorPageMsg {
    display: block;
    color: var(--color2);
    font-size: 22px;
    font-weight: 400;
  }

  main {
    overflow: hidden auto;
    height: calc(100vh - var(--navbarHeight));
  }
`

export default StyledResultPage
