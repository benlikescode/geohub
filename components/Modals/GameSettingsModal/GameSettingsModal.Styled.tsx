import styled from 'styled-components'

const StyledGameSettingsModal = styled.div`
  .mainContent {
    padding: var(--modalPadding);
    display: grid;
    gap: 2.5rem;
    background-color: #101010;
  }

  .map-details-wrapper {
    display: flex;
    align-items: center;

    .map-details {
      margin-left: 16px;
      margin-top: 2px;

      .map-name {
        font-size: 20px;
        font-weight: 600;
        display: block;
        margin-bottom: 8px;
      }

      .map-description {
        color: var(--color3);
        font-weight: 400;
      }
    }
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
    gap: 20px;
    color: var(--color4);
    font-size: 14px;
  }

  .movementOption {
    display: flex;
    align-items: center;
    gap: 8px;

    .movementOptionLabel {
      margin-top: 2px;
    }
  }

  .detailedSettings {
    margin-top: 40px;
  }

  .setting-options {
    display: flex;
    align-items: center;
    gap: 40px;
    /* justify-content: space-between; */
    margin-top: 10px;

    .time-slider {
      margin-top: 5px;
    }
  }

  .roundTimeLabel {
    color: var(--color5);
    font-size: 15px;

    .timeLimit {
      font-size: 14px;
      color: var(--color3);
    }
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

export default StyledGameSettingsModal
