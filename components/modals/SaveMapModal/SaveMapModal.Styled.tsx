import styled from 'styled-components'

type StyledProps = {}

const StyledSaveMapModal = styled.div<StyledProps>`
  padding: 30px 20px;
  display: grid;
  gap: 30px;

  .changes {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    font-size: 14px;
    font-weight: 400;
    color: #dcdcdc;

    .change-label {
      font-weight: 400;
      font-size: 14px;
    }

    .changes-wrapper {
      display: flex;
      align-items: center;
      gap: 12px;

      .change-pill {
        background-color: #0f291e;
        color: #4cc38a;
        border-radius: 8px;
        display: flex;
        align-items: center;
        font-weight: 400;
        font-size: 14px;
        gap: 8px;
        padding: 8px;
        border: 1px solid rgba(255, 255, 255, 0.05);

        &.update {
          background-color: #2c2100;
          color: #f0c000;
        }

        &.remove {
          background-color: #351010;
          color: #ffbbbb;
          background-color: #3b1813;
          color: #f16a50;
        }

        svg {
          height: 13px;
        }

        .change-text {
          position: relative;
          top: 1px;
        }
      }
    }
    .change-item {
      display: flex;
      align-items: center;
      gap: 12px;

      .change-bubble {
        height: 30px;
        width: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;

        .change-bubble-inner {
          background-color: #fff;
          padding: 2px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;

          svg {
            height: 16px;
            color: #015214;
          }
        }

        &.add {
          background-color: #53cd70;
        }

        &.update {
          background-color: #dfdf5c;
        }

        &.remove {
          background-color: #d45b5b;
        }
      }

      .change-text {
        font-size: 14px;
        color: #bbb;
      }
    }
  }

  .happy {
    font-size: 14px;
    font-weight: 400;
    color: #dcdcdc;
    margin-bottom: 6px;
  }

  .visibility-selection {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;

    .cool {
      display: grid;
      p {
        color: #999;
        font-weight: 400;
        font-size: 14px;
      }
    }

    .visibility-warning {
      color: var(--color2);
      font-size: 1rem;
      font-weight: 500;
    }
  }
`

export default StyledSaveMapModal
