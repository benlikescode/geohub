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
    z-index: 1;
  }

  .inputLabel {
    font-weight: 500;
    font-size: 15px;
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
    color: #9c9c9c;
    width: 75px;
    height: 30px;
    font-size: 14px;
    font-weight: 500;
  }

  .noFriends {
    font-size: 14px;
    color: #ff4747;
  }
`

export default StyledChallenge
