import styled from 'styled-components'

const StyledGameSettingsModal = styled.div`
  .main-content {
    padding: var(--modalPadding);
    display: grid;
    gap: 2.5rem;
    background-color: #101010;

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
  }

  .toggle-bar {
    background: #262626;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    display: flex;
    align-items: center;
    height: 47px;

    .toggle-item-wrapper {
      width: 100%;
      cursor: pointer;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      color: var(--color2);
      transition: all 0.3s ease-out;

      &.active {
        background-color: var(--mediumPurple);
        color: var(--color1);

        .toggle-icon {
          color: #fff;
        }
      }

      .toggle-item {
        display: flex;
        align-items: center;
        gap: 12px;

        .toggle-icon {
          height: 24px;
          width: 24px;
          color: #888888;
        }
      }
    }
  }

  .settings-wrapper {
    margin-top: 20px;

    .checkbox-wrapper {
      display: flex;
      align-items: center;
      gap: 10px;
      color: #969696;
      font-weight: 400;
      user-select: none;
    }

    .detailed-settings {
      margin-top: 40px;

      .round-time-label {
        color: var(--color5);
        font-size: 15px;

        .timeLimit {
          font-size: 14px;
          color: var(--color3);
        }
      }

      .setting-options {
        display: flex;
        align-items: center;
        gap: 40px;
        margin-top: 10px;

        .time-slider {
          margin-top: 5px;
        }

        .movement-options {
          display: flex;
          align-items: center;
          gap: 20px;
          color: var(--color4);
          font-size: 14px;

          .movement-option {
            display: flex;
            align-items: center;
            gap: 8px;

            .movement-option-label {
              margin-top: 2px;
            }
          }
        }
      }
    }
  }

  @media (max-width: 600px) {
    .setting-options {
      flex-direction: column;
      align-items: flex-start;
    }

    .round-time-label {
      font-size: 14px;
    }

    .toggle-item-wrapper {
      .toggle-item {
        gap: 8px;
        font-size: 15px;
      }
    }
  }
`

export default StyledGameSettingsModal
