import styled from 'styled-components'

const StyledProfilePage = styled.div`

  .profileWrapper {
    border: var(--border);
    border-radius: 12px;
    background-color: #171718;
  }
 
  .userBanner {
    position: relative;
    height: 250px;
    width: 100%;
    opacity: 0.75;
    border-bottom: var(--border);

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
    }
  }

  .profileTop {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-top: -4.8rem;
    padding: 0 2.5rem 2rem 2.5rem;
  }

  .userDetails {
    border-bottom: var(--border);
    padding: 0 2.5rem 2rem 2.5rem;
  }

  .userName {
    margin-bottom: 0.8rem;
    font-weight: 700;
    font-size: 2rem;
  }

  .userBio {
    color: var(--color3);
    font-size: 1.2rem;
  }

  .userStats {
    padding: 3rem 2.5rem 0 2.5rem;
  }

  .statRow {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding-top: 2rem;
  }

  .statItem {
    background-color: transparent;
    border: 2px solid rgba(255, 255, 255, 0.12);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 1.2rem;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }

  .statContent {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 0.3rem;
  }

  .statResult {
    font-weight: 600;
  }

  .statLabel {
    color: var(--lightPurple);
  }

  .userBadges {
    padding: 4rem 2.5rem;
  }

  .badgesRow {
    display: grid;
    grid-template-columns: repeat(6,1fr);
    gap: 2rem;
    padding-top: 2rem;
  }

  .badgeItem {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 0.5rem;
  }

  .sectionTitle {
    font-size: 28px;
    font-weight: 700;
    text-align: center;
    color: var(--color2);
  }
`

export default StyledProfilePage
