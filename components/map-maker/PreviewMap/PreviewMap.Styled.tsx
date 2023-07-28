import styled from 'styled-components'

type StyledProps = {
  showPreviewMap?: boolean
}

const StyledPreviewMap = styled.div<StyledProps>`
  height: 100%;

  .preview-map-wrapper {
    height: 100%;
    overflow: hidden;
    background-color: #222;
    flex: 2 1;

    .preview-map {
      height: calc(100% - 60px);
      position: relative;
      display: ${({ showPreviewMap }) => (showPreviewMap ? 'block' : 'none')};

      #previewMap {
        height: 100%;
        width: 100%;
      }
      /* 
        #previewMap > div.gm-style > div:nth-child(2) > div:nth-child(1) > div:nth-child(9) > div:nth-child(2) > div {
          filter: invert(1) !important;
        }

        #previewMap > div.gm-style > div:nth-child(2) > div:nth-child(1) > div:nth-child(9) > div:nth-child(1) {
          display: none;
        } */

      .preview-action-buttons {
        display: flex;
        align-items: center;
        gap: 12px;
        /* margin-top: 10px; */
        /* padding: 10px; */
        position: absolute;
        /* bottom: 30px;
          right: 12px; */
        z-index: 9;
        bottom: 8px;
        left: 8px;
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
`

export default StyledPreviewMap
