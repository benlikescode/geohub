import styled from 'styled-components'

const StyledAuthPage = styled.div`
  background-image: linear-gradient(180deg, rgba(19, 19, 20, 0) 0%, #131314 100%), url('/images/backgrounds/prettyImage2.jpeg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 800px) {
    background-image: none;
    background-color: var(--background1);
    align-items: flex-start;
  }

  .authContainer {
    max-width: 550px;
    width: 100%;
    background-color: var(--background2);
    color: var(--color1);
    border-radius: 4px;
    padding: 5rem 4rem;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.55);
    border: var(--border);

    @media (max-width: 800px) {
      box-shadow: none;
      border: none;
      padding: 2rem 1rem;
      background-color: inherit;
    } 
  }

  .title {
    font-weight: 400;
    font-size: 2rem;
    text-align: center;
    margin-bottom: 2.5rem;

    @media (max-width: 800px) {
      font-size: 1.6rem;
      text-align: left;
      margin-bottom: 2rem;
    }
  }

  .inputGroup {
    display: grid;
    gap: 2.5rem;
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
    color: var(--color2);
    margin-top: 1.2rem;

    a {
      color: var(--lightPurple);
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
    display: none;

    @media (max-width: 800px) {
      display: flex;
      align-items: center;
      gap: 15px;
      margin-bottom: 4rem;
    }
  }

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--darkPurple);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 2px 6px rgba(255, 255, 255, 0.25), inset 0px -3px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    height: 38px;
    width: 38px;
  }
`

export default StyledAuthPage
