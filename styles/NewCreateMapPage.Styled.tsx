import styled from 'styled-components'

type StyledProps = {}

const StyledNewCreateMapPage = styled.div<StyledProps>`
  .header {
    height: var(--navbarHeight);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    padding: 0 1rem;
    z-index: 20;
    background-color: ${({ theme }) => theme.color.gray[900]};
    border-bottom: 1px solid ${({ theme }) => theme.color.gray[800]};
    flex-shrink: 0 !important;

    .header-group {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .map-details {
      display: flex;
      align-items: center;
      gap: 12px;

      .map-name-wrapper {
        display: grid;

        .map-name {
          color: #fff;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }

      .edit-button {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: transparent;
        padding: 6px;
        border-radius: 4px;
        color: #999;

        &:hover {
          background-color: #444;
          color: #ccc;
        }

        svg {
          height: 20px;
        }
      }
    }

    .save-map-wrapper {
      display: flex;
      align-items: center;
      gap: 16px;

      .last-save-date {
        font-size: 12px;
        color: #858585;
      }
    }
  }

  .main-content {
    margin: 0 auto;
    height: calc(100vh - var(--navbarHeight));
    display: flex;
    flex: 1 1;
    flex-direction: row;
    gap: 8px;
    max-height: 100%;
    position: relative;
    overflow: hidden auto;
    padding: 16px;
    border-radius: 6px;

    .allotment-wrapper {
      border-radius: 6px;
    }

    .allotment-indicator {
      height: 30px;
      width: 30px;
      border-radius: 50%;
      background-color: #333;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba(255, 255, 255, 0.05);
      color: #555;
      position: absolute;
      top: 50%;
      right: -15px;
      z-index: 99999999999999999999999;

      svg {
        height: 18px;
      }
    }
  }

  .map-top-menu {
    height: 60px;
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    border-bottom: 4px solid #0e0e0e;

    .map-action-buttons {
      display: flex;
      align-items: center;
      gap: 12px;

      &.mobile {
        display: none;

        button {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 5px;
          padding: 10px;
          font-size: 1rem;
          font-weight: 500;
          user-select: none;
          background-color: var(--mediumPurple);
          color: rgb(255, 255, 255, 0.7);

          &.edit-button {
            background-color: rgb(255, 255, 255, 0.1);
          }

          svg {
            height: 20px;
            color: #fff;
          }

          &:hover {
            background-color: var(--indigo-600);

            &.edit-button {
              background-color: rgb(255, 255, 255, 0.15);
            }
          }
        }
        svg {
          height: 20px;
        }
      }
    }

    .locations-count {
      color: #dcdcdc;
      font-weight: 400;
    }

    .visibility-selection {
      display: flex;
      align-items: center;
      gap: 1rem;

      .visibility-warning {
        color: var(--color2);
        font-size: 1rem;
        font-weight: 500;
      }
    }
  }

  @media (max-width: 1060px) {
    .main-content {
      flex-direction: column;

      .selection-map-wrapper {
        .map-top-menu {
          .map-action-buttons {
            display: none;

            &.mobile {
              display: flex;
            }
          }
        }
      }

      .preview-map-wrapper {
        .no-locations-wrapper {
          .no-locations {
            img {
              height: 70px;
            }

            h2 {
              font-size: 18px;
            }

            h3 {
              margin-top: 2px;
              font-size: 14px;
            }
          }
        }
      }
    }
  }

  .import-export {
    display: flex;
    align-items: center;
    gap: 16px;

    .import-button {
      input {
        display: none;
      }

      label {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #333;
        height: 40px;
        padding: 0 20px;
        border-radius: 5px;
        font-weight: 400;
      }
    }

    .export-button {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #333;
      height: 40px;
      padding: 0 20px;
      border-radius: 5px;
      font-weight: 400;
      color: #fff;
    }
  }
`

export default StyledNewCreateMapPage
