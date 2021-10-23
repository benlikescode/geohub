import styled from 'styled-components'

const StyledAuthPage = styled.div`
  background: url('/images/backgrounds/authPage.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: calc(100vh - 60px);
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
    margin-top: 15px;

    a {
      color: var(--lightPurple);
    }
  }

  .errorBanner {
    background-color: var(--red-500);
    color: #fff;
    border-radius: 4px;
    padding: 15px;
    font-size: 14px;
    font-weight: 400;
    display: flex;
    align-items: center;
    margin-bottom: 40px;

    svg {
      height: 14px;
      width: 14px;
      fill: #fff;
    }
  }

  .inputErrorText {
    display: block;
    margin-top: 3px;
    margin-left: 10px;
  }
`

export default StyledAuthPage
