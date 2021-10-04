import styled from 'styled-components'

const StyledGameSettings = styled.div`
  background-color: var(--background2);
  border-radius: 4px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  max-width: 650px;

  .header {
    border-bottom: var(--border);
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    h2 {
      font-size: 24px;
      font-weight: 500;
    }
  }

  .mainContent {
    padding: 30px;
    display: grid;
    gap: 20px;
  }

  .contentItem {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .label {
    font-size: 20px;
    color: var(--color2);
  }

  .mapPreview {
    position: relative;
    height: 130px;
    border-radius: 4px;
    background: #c94b4b;
    background: -webkit-linear-gradient(to right, #4b134f, #c94b4b);  
    background: linear-gradient(to right, #4b134f, #c94b4b); 
  }

  .mapPreviewText {
    position: absolute;
    left: 20px;
    top: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 45%;
  }

  .mapImageWrapper {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 50%;
  }

  .mapImage {
    position: relative;
    height: 100%;
    clip-path: polygon(20% 0,0 100%,100% 100%,100% 0);

    img {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
  }

  .changeMap {
    background: rgba(0, 0, 0, 0.8);
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    position: absolute;
    bottom: 5px;
    right: 5px;
  }

  .mapName {
    font-size: 24px;
  }

  .mapDescription {
    color: var(--color2);
    font-weight: 400;
  }

  .buttonsWrapper {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .checkboxWrapper {
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--color2);
    user-select: none;
  }

  .movementOptions {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .movementOption {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .detailedSettings {
    display: grid;
    gap: 25px;
    margin-top: 30px;
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
  }

  .settingsWrapper {
    margin-top: 20px;
  }

  .footer {
    border-top: var(--border);
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
`

export default StyledGameSettings
