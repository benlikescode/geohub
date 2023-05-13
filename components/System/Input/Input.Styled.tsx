import styled from 'styled-components'

type StyledProps = {
  fontSize?: string
}

const StyledInput = styled.div<StyledProps>`
  width: 100%;

  label {
    font-weight: 400;
    margin-bottom: 8px;
    display: block;
    color: #919191;
    font-size: 14px;
  }

  .input-wrapper {
    height: 38px;
    display: flex;
    align-items: center;
    position: relative;

    input {
      height: 100%;
      border-radius: 5px;
      padding: 0 14px;
      background-color: var(--background3);
      width: 100%;
      box-sizing: border-box;
      color: var(--color3);
      font-size: ${({ fontSize }) => (fontSize ? fontSize : '1rem')};
      font-weight: 400;
      transition: background-color 240ms, box-shadow 240ms;
      border: 1px solid #282828;

      ::placeholder {
        color: #808080;
      }

      :focus {
        box-shadow: 0 0 0 2px var(--mediumPurple);
      }
    }
  }

  .input-icon {
    position: absolute;
    right: 14px;
    background: none;
  }

  .inputError {
    color: var(--lightRed);
    font-size: 14px;
    margin-top: 10px;
    font-weight: 400;
    display: flex;
    align-items: center;

    svg {
      fill: var(--lightRed);
      height: 14px;
      width: 14px;
    }
  }

  .inputErrorText {
    display: block;
    margin-top: 3px;
    margin-left: 10px;
  }

  .textarea-wrapper {
    height: 80px;
    position: relative;

    textarea {
      height: 100%;
      border-radius: 5px;
      padding: 10px 14px;
      background-color: var(--background3);
      width: 100%;
      box-sizing: border-box;
      color: var(--color3);
      font-size: ${({ fontSize }) => (fontSize ? fontSize : '1rem')};
      font-weight: 400;
      transition: background-color 240ms, box-shadow 240ms;
      border: 1px solid #282828;
      resize: none;

      ::placeholder {
        color: #808080;
      }

      :focus {
        box-shadow: 0 0 0 2px var(--mediumPurple);
      }
    }

    .char-count {
      color: var(--color3);
      font-size: 14px;
      position: absolute;
      bottom: 8px;
      right: 8px;
      font-weight: 400;
    }
  }
`

export default StyledInput
