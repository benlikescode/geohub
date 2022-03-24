import styled from 'styled-components'

const StyledProfilePage = styled.div`
  .profileWrapper {
    border: 1px solid #141414;
    border-radius: 12px;

    @media (max-width: 500px) {
      border-radius: 0;
    }
  }

  // Override Horizontal Padding In Layout.Styled
  .mainContent {
    @media (max-width: 500px) {
      padding: 0;
    }
  }
 
  .userBanner {
    position: relative;
    height: 200px;
    width: 100%;
    opacity: 0.75;
    border-bottom: var(--border);

    @media (max-width: 500px) {
      height: 120px;
    }

    img {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      object-fit: cover;
      height: 100%;
      width: 100%;
      border-radius: 12px 12px 0 0;

      @media (max-width: 500px) {
        border-radius: 0;
      }
    }
  }

  .profileTop {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-top: -3.8rem;
    padding: 0 2.5rem 2rem 2.5rem;

    @media (max-width: 1050px) {
      padding: 0 1rem 2rem 1rem;
    }
  }

  .userDetails {
    border-bottom: 1px solid #202020;
    padding: 0 2.5rem 2rem 2.5rem;

    @media (max-width: 1050px) {
      padding: 0 1rem 2rem 1rem;
    }
  }

  .userName {
    margin-bottom: 0.8rem;
    font-weight: 700;
    font-size: 1.75rem;
  }

  .userBio {
    color: var(--color3);
    font-size: 1rem;
  }

  .userStats {
    padding: 3rem 2.5rem 0 2.5rem;

    @media (max-width: 1050px) {
      padding: 3rem 1rem 0 1rem;
    }
  }

  .statRow {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding-top: 2rem;

    @media (max-width: 500px) {
      gap: 0.5rem;
    }
  }

  .statItem {
    background-color: transparent;
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 1.2rem;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

    @media (max-width: 700px) {
      padding: 1rem;
    }

    @media (max-width: 500px) {
      padding: 0.5rem;
    }
  }

  .statContent {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 0.3rem;
  }

  .statResult {
    font-weight: 600;

    @media (max-width: 1000px) {
      font-size: 1.25rem;
    }
  }

  .statLabel {
    color: var(--lightPurple);

    @media (max-width: 1000px) {
      font-size: 14px;
    }
  }

  .userBadges {
    padding: 4rem 2.5rem;

    @media (max-width: 1050px) {
      padding: 4rem 1rem;
    }
  }

  .badgesRow {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    padding-top: 2rem;
    gap: 2rem;

    @media (max-width: 1000px) {
      grid-template-columns: repeat(3, 1fr);
     
    }
  }

  .badgeItem {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 0.5rem;
  }

  .badgeLabel {
    @media (max-width: 630px) {
      font-size: 13px;
    }
  }

  .sectionTitle {
    font-size: 1.5rem;
    font-weight: 600;
    //text-align: center;
    color: var(--color2);
  }

  .badgeImg {
    @media (max-width: 500px) {
      height: 60px;
      width: 60px;
    }
  }
`

export default StyledProfilePage
