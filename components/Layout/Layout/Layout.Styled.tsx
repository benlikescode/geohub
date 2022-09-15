import styled from 'styled-components'

type StyledProps = {
  isHome?: boolean
  maxWidth?: string
}

const StyledLayout = styled.div<StyledProps>`
  min-height: 100vh;

  .appBody {
    display: grid;
    grid-template-columns: var(--sidebarWidth) auto;
    min-height: calc(100vh - var(--navbarHeight));
    //height: 100%;

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
    max-width: ${({ theme, maxWidth }) => (maxWidth ? maxWidth : theme.breakpoint.l)};
    width: 100%;
    padding: 3.5rem;
    display: grid;
    gap: 3rem;
    margin: 0 auto;
    padding-top: ${({ isHome }) => isHome && '4rem'};

    @media (max-width: 500px) {
      padding: 3rem 1rem;
    }
  }

  .heroBannerWrapper {
    position: absolute;
    top: 0;
    width: 100%;
    height: 296px;
    border-bottom: 1px solid #222;
  }

  .heroBanner {
    background-image: linear-gradient(180deg, rgba(19, 19, 20, 0) 0%, #131314 100%),
      url('/images/backgrounds/hero1.jpeg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
    position: relative;
  }

  .heroGradient {
    height: 200px;
    width: 100%;
    background: linear-gradient(180deg, rgba(19, 19, 20, 0) 0%, rgba(19, 19, 20, 0.75) 100%);
    transform: rotate(-180deg);
    position: absolute;
    top: 0;
  }
`

export default StyledLayout
