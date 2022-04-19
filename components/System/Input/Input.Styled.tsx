import styled from 'styled-components'

const StyledInput = styled.div`
  width: 100%;
  
  label {
    font-weight: 500;
    margin-bottom: 6px;
    display: block;
    color: var(--color2);
  }

  .input-styled {
    height: 38px;
    display: flex;
    align-items: center;
   
    input {
      height: 100%;
      border-radius: 5px;
      padding: 0 14px;
      background-color: var(--background3);
      width: 100%;
      box-sizing: border-box;
      color: var(--color3);
      font-size: 1rem;
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
`

export default StyledInput