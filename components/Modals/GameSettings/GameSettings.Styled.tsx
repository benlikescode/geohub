import styled from 'styled-components'

const StyledGameSettings = styled.div`
  background-color: var(--background1);
  border-radius: 4px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  max-width: 650px;

  .header {
    border-bottom: var(--border);
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 30px;
    
    h2 {
      font-size: 20px;
      font-weight: 500;
    }
  }

  .mainContent {
    padding: 30px;
    display: grid;
    gap: 50px;
    background-color: #131314;
  }

  .mapInfo {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .mapName {
    font-size: 20px;
  }

  .mapDescription {
    color: var(--color2);
    font-weight: 400;
  }

  .toggleBar {
    background: #262626;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    display: flex;
    align-items: center;
    height: 47px;
  }

  .toggleIcon {
    height: 24px;
    width: 24px;
    color: #888888;
   
  }

  .toggleItem {
    width: 100%;
    cursor: pointer;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    color: var(--color2);
    transition: all 0.3s ease-out;
  }

  .active {
    background-color: var(--mediumPurple);
    color: var(--color1);

    .toggleIcon {
      color: #fff;
    }
  }

  .checkboxWrapper {
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--color2);
    font-weight: 400;
    user-select: none;
  }

  .movementOptions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--color2);
  }

  .movementOption {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .detailedSettings {
    display: grid;
    gap: 40px;
    margin-top: 40px;
  }

  .timeLimitWrapper {
    display: flex;
    align-items: center;
  }

  .timeLabel {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 60px;
    margin-right: 15px;
    color: var(--color2);
  }

  .settingsWrapper {
    margin-top: 20px;
  }

  .footer {
    border-top: var(--border);
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 15px;
    padding: 15px 30px;
  }
`

export default StyledGameSettings
