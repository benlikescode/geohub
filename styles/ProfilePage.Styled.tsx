import styled from 'styled-components'

const StyledProfilePage = styled.div`

  .profileWrapper {
    border: var(--border);
    border-radius: 12px;
    background-color: #171718;
  }
 
  .userBanner {
    position: relative;
    height: 200px;
    width: 100%;

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
    margin-top: -4.5rem;
    padding: 0 2.5rem 2rem 2.5rem;
  }

  .userDetails {
    border-bottom: var(--border);
    padding: 0 2.5rem 2rem 2.5rem;
  }

  .userName {
    margin-bottom: 0.8rem;
    font-weight: 700;
  }

  .userBio {
    color: var(--color3);
  }

  .userStats {
    padding: 2rem 2.5rem 0 2.5rem;
  }

  .statRow {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding-top: 1rem;
  }

  .statItem {
    background-color: var(--background2);
    border: 2px solid rgba(255, 255, 255, 0.12);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 1rem;
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
    padding: 2rem 2.5rem;
  }

  .badgesRow {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    padding-top: 1rem;
  }

  .badgeItem {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 0.5rem;
  }

  .sectionTitle {
    font-size: 20px;
    font-weight: 500;
  }
`

export default StyledProfilePage
