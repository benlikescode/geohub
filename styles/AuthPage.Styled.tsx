import styled from 'styled-components'

const StyledAuthPage = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(250deg, rgba(19, 19, 20, 0) 0%, #0e0e0e 50%), url('/images/backgrounds/hero.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  @media (max-width: 450px) {
    background-image: none;
  }

  .authContainer {
    max-width: 400px;
    width: 100%;
    background-color: #101112;
    color: var(--color1);
    border-radius: 4px;
    padding: 30px;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.55);
    border: 1px solid #222;

    @media (max-width: 450px) {
      box-shadow: none;
      border: none;
      padding: 2rem 1rem;
      background-color: inherit;
    }
  }

  .title {
    font-weight: 600;
    font-size: 20px;
    margin-bottom: 20px;
    color: var(--color2);
  }

  .inputGroup {
    display: grid;
    gap: 30px;
    border-top: 1px solid #333;
    padding-top: 30px;
  }

  .errorMessage {
    color: var(--red-400);
    font-weight: 600;
    font-size: 14px;
    margin-top: 10px;
  }

  .authPrompt {
    font-weight: 400;
    display: block;
    text-align: center;
    color: #919191;
    margin-top: 16px;
    font-size: 13px;

    a {
      color: #a78bfa;
      display: inline-flex;
      margin-left: 6px;
      text-decoration: underline;

      &:hover {
        svg {
          transform: translateX(1.1px) scale(1.1);
        }
      }

      svg {
        height: 13px;
        margin-left: 4px;
      }
    }
  }

  .errorBanner {
    background-color: transparent;
    border: 2px solid var(--red-500);
    color: var(--red-300);
    border-radius: 4px;
    padding: 15px;
    font-size: 14px;
    font-weight: 400;
    display: flex;
    align-items: center;
    margin-bottom: 40px;
    transition: all 0.4s ease;

    svg {
      height: 14px;
      width: 14px;
      fill: var(--red-300);
    }
  }

  .inputErrorText {
    display: block;
    margin-top: 3px;
    margin-left: 10px;
  }

  .logoWrapper {
    position: absolute;
    top: 16px;
    left: 16px;
  }
`

export default StyledAuthPage
