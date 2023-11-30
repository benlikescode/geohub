import styled from 'styled-components'

type StyledProps = {}

const StyledDailyQuotaModal = styled.div<StyledProps>`
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;

    .modal-title {
      color: #fff;
      font-size: 18px;
      font-weight: 600;

      @media (max-width: 600px) {
        font-size: 16px;
      }
    }

    .close-button {
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      color: #555;
      padding: 4px;
      border-radius: 6px;

      &:hover {
        background-color: #222;
      }

      svg {
        height: 20px;
      }
    }
  }

  .modal-text {
    color: #8a8a8a;
    font-size: 15px;
    font-weight: 400;

    span {
      font-weight: 500;
      color: #a0a0a0;
    }
  }

  .support-title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 16px;
    color: #dcdcdc;
  }

  .modal-section {
    padding: 28px;

    &:not(:first-child) {
      border-top: 1px solid #282828;
    }
  }

  .support-links {
    display: grid;
    gap: 16px;
    margin-top: 26px;

    .support-link {
      height: 50px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--mediumPurple);
      color: #fff;
      font-weight: 400;
      user-select: none;
      flex-shrink: 0;

      &:hover {
        background-color: var(--indigo-600);
      }

      &.donate {
        background-color: rgb(255, 255, 255, 0.1);
        color: #fff;

        &:hover {
          background-color: rgb(255, 255, 255, 0.15);
        }
      }
    }
  }

  .checkbox-wrapper {
    margin-top: 20px;
    color: #969696;
    font-weight: 400;
    user-select: none;
    font-size: 15px;
  }
`

export default StyledDailyQuotaModal
