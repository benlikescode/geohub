import styled from 'styled-components'

const StyledChallenge = styled.div`
  display: grid;
  gap: 40px;

  .inputWrapper {
    display: flex;
    align-items: center;
  }

  .copyBtn {
    width: 70px;
    height: 30px;
    background-color: var(--mediumPurple);
    color: var(--color1);
    border-radius: 5px;
    margin-left: -75px;
    font-size: 14px; 
  }

  .inputLabel {
    font-weight: 500;
    margin-bottom: 10px;
    display: block;
    color: var(--color2);
  }

  .friendsList {
    display: grid;
    gap: 20px;
    padding-top: 8px;
  }

  .friendItem {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  

  .inviteBtn {
    border: var(--borderLight);
    background: transparent;
    border-radius: 5px;
    color: #9C9C9C;
    width: 75px;
    height: 30px;
    font-size: 14px;
    font-weight: 500;
  }

`

export default StyledChallenge
