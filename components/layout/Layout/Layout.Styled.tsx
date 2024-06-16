import styled from 'styled-components'

const StyledLayout = styled.div`
  .app-layout {
    overflow: hidden;
    height: 100vh;
    position: relative;
  }

  .appBody {
    display: flex;
    width: 100%;
    overflow: hidden;
  }

  .banner-message {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 20px;
    padding: 20px;
    border-radius: 20px;
    background-color: #14073a;
    z-index: 99999;
    border: 1px solid rgba(255, 255, 255, 0.1);
    text-align: center;
    font-weight: 400;
    width: fit-content;

    p {
      margin-top: 4px;
      font-size: 15px;
      color: #fff;
    }
  }

  .ban-message {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 20px;
    padding: 20px;
    border-radius: 20px;
    background-color: #14073a;
    background-color: #7f1d1d;
    background-color: #450a0a;
    z-index: 99999;
    border: 1px solid rgba(255, 255, 255, 0.1);
    text-align: center;
    font-weight: 400;
    width: fit-content;

    p {
      margin-top: 4px;
      font-size: 15px;
      color: #fca5a5;
      color: #fecaca;
    }
  }

  main {
    width: 100% !important;
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
