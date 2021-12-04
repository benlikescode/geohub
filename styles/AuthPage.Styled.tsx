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

  .title {
    font-weight: 400;
    font-size: 32px;
    text-align: center;
    margin-bottom: 40px;
  }

  .inputGroup {
    display: grid;
    gap: 40px;
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
`

export default StyledAuthPage
