import styled from 'styled-components'

const StyledResultPage = styled.div`
  section {
    height: 100vh;
    height: 100dvh;
    overflow: hidden auto;
    display: grid;
    grid-template-rows: var(--navbarHeight) calc(100% - 250px - var(--navbarHeight)) auto;

    // Navbar goes position fixed at 600px
    @media (max-width: 600px) {
      grid-template-rows: calc(100% - 250px) auto;
    }
  }

  .not-played-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    padding: 0 1rem;

    .not-played {
      display: flex;
      align-items: center;
      flex-direction: column;

      h1 {
        font-size: 20px;
        color: #dadada;
        font-weight: 500;
        line-height: 35px;
        text-align: center;
      }

      p {
        margin-top: 10px;
        color: #6a6a6a;
        font-size: 16px;
        font-weight: 400;
        text-align: center;
        line-height: 23px;
      }

      a {
        margin-top: 30px;
      }
    }
  }
`

export default StyledResultPage
