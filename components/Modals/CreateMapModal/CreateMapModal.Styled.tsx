import styled from 'styled-components'

const StyledCreateMapModal = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 1fr;

  .map-details-section {
    display: grid;
    gap: 40px;
    width: 100%;
    padding: 24px;

    .avatar-selection {
      .avatars {
        display: flex;
        align-items: center;
        gap: 16px;
        flex-wrap: wrap;

        .avatar-item {
          height: 36px;
          width: 36px;
          position: relative;
          border-radius: 30%;
          outline: 1px solid rgba(255, 255, 255, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          user-select: none;
          cursor: pointer;
          background-color: #888888;

          &:hover {
            outline: 2px solid #ffffff;
          }
          &.selected {
            outline: 3px solid #ffffff;
          }

          img {
            border-radius: 50%;
          }
        }
      }
    }

    .section-title {
      font-size: 14px;
      font-weight: 400;
      color: #919191;
      margin-bottom: 12px;
    }
  }

  .map-preview-section {
    height: 100%;
    padding: 25px;
    border-left: 1px solid #181818;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 750px) {
    grid-template-columns: 1fr;

    .map-preview-section {
      border-left: none;
      border-top: 1px solid #181818;
    }
  }
`

export default StyledCreateMapModal
