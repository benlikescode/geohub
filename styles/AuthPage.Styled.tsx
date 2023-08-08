import styled from 'styled-components'

const StyledAuthPage = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #121212;

  .authContainer {
    max-width: 400px;
    width: 100%;
    background-color: #151515;
    color: var(--color1);
    border-radius: 16px;
    padding: 30px;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.55);
    border: 1px solid #222;

    @media (max-width: 600px) {
      box-shadow: none;
      border: none;
      padding: 2rem 1rem;
      background-color: inherit;
    }
  }

  .title {
    font-weight: 600;
    font-size: 18px;
    margin-bottom: 20px;
    color: var(--color2);
  }

  .form-container {
    padding-top: 30px;
    border-top: 1px solid #303030;

    .inputGroup {
      display: grid;
      gap: 30px;

      @media (max-width: 600px) {
        border-top: none;
        padding-top: 20px;
      }
    }

    .forgot-message {
      font-weight: 400;
      font-size: 13px;
      color: var(--indigo-400);
      display: block;
      margin: 12px 0 30px 0;
      cursor: pointer;
      width: fit-content;
    }

    .submit-button {
      margin-top: 30px;
    }
  }

  .authPrompt {
    font-weight: 400;
    display: block;
    text-align: center;
    color: #919191;
    margin-top: 16px;
    font-size: 13px;

    a {
      color: var(--indigo-400);
      display: inline-flex;
      margin-left: 4px;
    }
  }

  .logoWrapper {
    position: absolute;
    top: 16px;
    left: 16px;
  }

  .email-sent-container {
    .email-sent-msg {
      color: #aaa;
      font-weight: 400;
      font-size: 15px;
      line-height: 22px;

      button {
        background: transparent;
        color: var(--indigo-400);
        font-weight: 400;
        font-size: 15px;
        margin-left: 4px;
      }
    }
  }
`

export default StyledAuthPage
