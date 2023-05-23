import styled from 'styled-components'

type StyledProps = {
  isShowingPreview?: boolean
}

const StyledCreateMapPage = styled.div<StyledProps>`
  .main-content {
    max-width: 2000px;
    width: 100%;
    padding: 1rem;
    margin: 0 auto;
    height: calc(100vh - var(--navbarHeight));
    display: flex;
    flex: 1 1;
    flex-direction: row;
    gap: 8px;
    max-height: 100%;
    position: relative;
    overflow: hidden auto;

    .selection-map-wrapper {
      //max-height: calc(100vh - 5rem);
      height: 100%;
      //overflow: hidden;
      background-color: #212121;
      border-radius: 6px;
      padding: 16px;

      flex: 3 1;
      position: relative;

      #selectionMap {
        height: calc(100% - 76px);
        width: 100%;
        border-radius: 8px;
      }
    }

    .preview-map-wrapper {
      height: 100%;
      overflow: hidden;
      background-color: #212121;
      border-radius: 6px;
      padding: 16px;
      flex: 2 1;
      /* display: grid;
      grid-template-rows: auto minmax(0px, 1fr); */

      .preview-map {
        height: 50%;
        border-radius: 8px;
        display: ${({ isShowingPreview }) => (isShowingPreview ? 'block' : 'none')};

        #previewMap {
          height: 100%;
          width: 100%;
          border-radius: 8px;
        }

        .preview-action-buttons {
          display: ${({ isShowingPreview }) => (isShowingPreview ? 'flex' : 'none')};
          align-items: center;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 20px;
        }
      }

      .no-locations-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: calc(100% - 76px);

        .no-locations {
          max-width: 450px;
          display: flex;
          flex-direction: column;
          align-items: center;
          user-select: none;

          img {
            filter: grayscale(1);
            height: 100px;
          }

          h2 {
            font-size: 20px;
            color: #e7e7e7;
            font-weight: 500;
            line-height: 35px;
            text-align: center;
            margin-top: 12px;
          }

          h3 {
            margin-top: 10px;
            color: #828181;
            font-size: 16px;
            font-weight: 400;
            text-align: center;
            line-height: 23px;
          }
        }
      }
    }
  }

  .map-top-menu {
    border-radius: 6px;
    background-color: #363636;
    height: 60px;
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;

    .map-details {
      display: flex;
      align-items: center;
      gap: 12px;

      .map-name-wrapper {
        display: grid;

        .map-name {
          color: #fff;
          font-size: 18px;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }

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
      color: var(--color2);
      font-size: 18px;
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
        .preview-map {
          height: 100%;
          display: ${({ isShowingPreview }) => isShowingPreview && 'grid'};
          align-items: start;
          grid-template-rows: auto min-content;
        }

        .map-top-menu {
          display: ${({ isShowingPreview }) => isShowingPreview && 'none'};
        }

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

  @media (max-width: 600px) {
    .main-content {
      padding: 66px 16px 86px 16px;
      height: 100vh;
    }
  }
`

export default StyledCreateMapPage
