import styled from 'styled-components'

type StyledProps = {
  showPreviewMap?: boolean
}

const StyledNewCreateMapPage = styled.div<StyledProps>`
  height: 100vh;
  height: 100dvh;

  .allotment-item {
    display: grid;
    grid-template-rows: 55px auto 55px;
    gap: 3px;

    &.border {
      border-right: 2px solid #0e0e0e;
    }
  }

  .menu-group {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    background-color: #222;
    padding: 0 10px;

    .preview-bottom {
      display: ${({ showPreviewMap }) => (showPreviewMap ? 'flex' : 'none')};
      align-items: center;
      justify-content: space-between;
      width: 100%;

      .pano-description {
        font-size: 15px;
        font-weight: 400;
        color: #dcdcdc;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex: 1;
      }

      .preview-action-buttons {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 16px;
      }
    }

    .locations-count {
      color: #dcdcdc;
      font-weight: 400;
      font-size: 15px;
    }
  }

  .map-details {
    display: flex;
    align-items: center;
    gap: 12px;

    .map-name-wrapper {
      display: flex;
      align-items: center;
      gap: 4px;

      .map-name {
        color: #fff;
        font-weight: 400;
        font-size: 15px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        position: relative;
        top: 1px;
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
      margin-left: -4px;

      &:hover {
        background-color: #444;
        color: #ccc;
      }

      svg {
        height: 16px;
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

  .selection-map-wrapper {
    background-color: #222;
    position: relative;
    background-color: #222;
    height: 100%;
  }

  .preview-map-wrapper {
    height: 100%;
    overflow: hidden;
    background-color: #222;

    .preview-map {
      height: 100%;
      position: relative;
      display: ${({ showPreviewMap }) => (showPreviewMap ? 'block' : 'none')};

      #previewMap {
        height: 100%;
        width: 100%;
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

  @media (max-width: 600px) {
    .allotment-item {
      &.border {
        border-right: none;
        border-bottom: 2px solid #0e0e0e;
      }
    }

    .last-save-date {
      display: none;
    }

    .pano-description {
      display: none;
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
`

export default StyledNewCreateMapPage
