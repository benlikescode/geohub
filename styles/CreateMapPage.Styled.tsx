import styled from 'styled-components'

type StyledProps = {
  showPreviewMap?: boolean
}

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
    height: calc(100vh - var(--navbarHeight));
    padding: 16px;

    .allotment-wrapper {
      border-radius: 6px;
    }

    .selection-map-wrapper {
      background-color: #222;
      flex: 3 1;
      position: relative;
      border-right: 2px solid #0e0e0e;
      background-color: #222;
      height: 100%;
    }

    .preview-map-wrapper {
      height: 100%;
      overflow: hidden;
      background-color: #222;
      flex: 2 1;

      .preview-map {
        height: calc(100% - 120px);
        position: relative;
        display: ${({ showPreviewMap }) => (showPreviewMap ? 'block' : 'none')};

        #previewMap {
          height: 100%;
          width: 100%;
        }

        #previewMap > div.gm-style > div:nth-child(2) > div:nth-child(1) > div:nth-child(9) > div:nth-child(2) > div {
          filter: invert(1) !important;
        }

        #previewMap > div.gm-style > div:nth-child(2) > div:nth-child(1) > div:nth-child(9) > div:nth-child(1) {
          display: none;
        }

        .bottom-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 0 10px;
          height: 60px;

          .pano-description {
            font-size: 15px;
            font-weight: 400;
            color: #dcdcdc;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;

            @media (max-width: 600px) {
              display: none;
            }
          }

          .preview-action-buttons {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 16px;
          }
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
  }

  .map-top-menu {
    height: 60px;
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    border-bottom: 4px solid #0e0e0e;

    .locations-count {
      color: #dcdcdc;
      font-weight: 400;
    }
  }

  @media (max-width: 1060px) {
    .main-content {
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
`

export default StyledNewCreateMapPage
