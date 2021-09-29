import styled from 'styled-components'

const StyledInput = styled.div`
  width: 100%;
  
  label {
    font-weight: 600;
    margin-bottom: 6px;
    display: block;
    color: #394151;
  }
  .input-styled {
    height: 42px;
    display: flex;
    align-items: center;
   
    input {
      height: 100%;
      border-radius: 3px;
      padding: 0 14px;
      background-color: transparent;
      width: 100%;
      box-sizing: border-box;
      color: var(--gray-800);
      border: var(--borderLight);
      outline: none;
      font-size: 1rem;
      
      &::placeholder {
        color: #9CA3AF;
      }
      &:focus {
       
      } 
    }
  }
`

export default StyledInput