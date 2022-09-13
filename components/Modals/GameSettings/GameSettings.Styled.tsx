import styled from 'styled-components'

const StyledGameSettings = styled.div`
  .test {
    display: grid;
    gap: 1.25rem;
    padding-bottom: 1.5rem;
  }

  .test123 {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .mainContent {
    padding: var(--modalPadding);
    display: grid;
    gap: 2.5rem;
    background-color: #101010;
  }

  .mapInfo {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .mapName {
    font-size: 28px;
    font-weight: 600;
    color: var(--color2);
  }

  .mapDescription {
    color: var(--color3);
    font-weight: 400;
    font-size: 18px;
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
    color: #969696;
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
`

export default StyledGameSettings
