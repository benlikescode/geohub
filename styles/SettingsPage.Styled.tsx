import styled from 'styled-components'

const StyledSettingsPage = styled.div`
  .header {
    padding-bottom: 20px;
    margin-bottom: 20px;
    display: flex;
    align-items: end;
    justify-content: space-between;
    border-bottom: 1px solid ${({ theme }) => theme.color.gray[800]};

    .header-details {
      h1 {
        font-size: 20px;
        font-weight: 500;
        color: rgb(245, 245, 245);
      }

      h2 {
        margin-top: 6px;
        font-size: 15px;
        font-weight: 400;
        color: rgb(163, 163, 163);
      }
    }
  }

  .settings-loader {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .settings-body {
    display: grid;
    grid-template-columns: 1fr;
    justify-content: space-between;
    gap: 40px;

    .settings-form {
      display: grid;
      gap: 25px;
      align-content: flex-start;
    }

    .maps-key-cta {
      padding: 16px;
      border-radius: 6px;
      border: 1px solid ${({ theme }) => theme.color.gray[800]};
      background-color: #181818;

      .cta-title {
        display: block;
        font-weight: 500;
        font-size: 18px;
        letter-spacing: -0.02rem;
        color: #f3f3f3;
        line-height: 26px;
      }

      .cta-description {
        display: block;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: -0.01rem;
        color: #9e9e9e;
        margin: 20px 0 25px 0;
        max-width: 410px;
      }

      .cta-button {
        padding: 16px;

        svg {
          height: 20px;
        }
      }
    }

    .custom-key-success-message {
      color: #9e9e9e;
      font-size: 14px;
      display: grid;
      gap: 8px;
      padding: 16px;
      border-radius: 6px;
      border: 1px solid ${({ theme }) => theme.color.gray[800]};
      background-color: #181818;
    }

    .logout-btn {
      padding: 1px 14px 0 14px;
      font-weight: 500;
      user-select: none;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      transition: 0.2s;
      border-radius: 6px;

      color: #fee2e2;
      background-color: #7f1d1d;

      &:hover {
        background-color: #991b1b;
      }
    }
  }

  @media (max-width: 600px) {
    .settings-body {
      .maps-key-cta {
        .cta-title {
          font-size: 16px;
        }
      }
    }
  }
`

export default StyledSettingsPage
