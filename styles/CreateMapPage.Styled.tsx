import styled from 'styled-components'

type StyledProps = {
  isShowingPreview?: boolean
}

const StyledCreateMapPage = styled.div<StyledProps>`
  .app-body {
    min-height: 100vh;
    display: grid;
    grid-template-columns: auto;
    //padding-top: var(--navbarHeight);
  }

  .main-content {
    max-width: 2000px;
    width: 100%;
    padding: 1rem;
    margin: 0 auto;
    height: calc(100vh - var(--navbarHeight));
    display: flex;
    flex: 1 1;
    flex-direction: row;
    gap: 1rem;
    position: relative;

    @media (max-width: 500px) {
      padding: 3rem 1rem;
    }

    .selection-map-wrapper {
      //max-height: calc(100vh - 5rem);
      height: 100%;
      //overflow: hidden;
      background-color: #212121;
      border-radius: 6px;
      padding: 1rem;

      flex: 3 1;
      position: relative;

      #selectionMap {
        height: calc(100% - 76px);
        width: 100%;
        border-radius: 8px;
      }
    }

    .preview-map-wrapper {
      //max-height: calc(100vh - 5rem);
      height: 100%;
      overflow: hidden;
      background-color: #212121;
      border-radius: 6px;
      padding: 1rem;

      flex: 2 1;

      #previewMap {
        height: 50%;
        width: 100%;
        border-radius: 8px;
        display: ${({ isShowingPreview }) => (isShowingPreview ? 'block' : 'none')};
      }

      .no-locations-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        //padding-top: 6rem;
        height: calc(100% - (92px * 2));

        .no-locations {
          max-width: 450px;
          display: flex;
          flex-direction: column;
          align-items: center;
          user-select: none;

          img {
            filter: grayscale(1);
            height: 100px;
            width: 100px;
          }

          h2 {
            font-size: 1.75rem;
            margin-top: 1.5rem;
            color: #fff;
            font-weight: 500;
            line-height: 35px;
            text-align: center;
          }

          h3 {
            margin-top: 1rem;
            color: #ababab;
            font-size: 1.25rem;
            font-weight: 400;
          }
        }
      }

      .preview-action-buttons {
        display: ${({ isShowingPreview }) => (isShowingPreview ? 'flex' : 'none')};
        align-items: center;
        justify-content: flex-end;
        gap: 20px;
        margin-top: 20px;
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
      gap: 1rem;

      .map-name {
        color: #fff;
        font-size: 20px;
        font-weight: 500;
      }
    }

    .map-action-buttons {
      display: flex;
      align-items: center;
      gap: 1rem;
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
`

export default StyledCreateMapPage
